if (global.__codeFlowReporter) {
    //browser wise
    throw Error("JS Code Flow Reporter already loaded");
}

global.__codeFlowReporter = {
    running: false,
    hits: {},
    calls: [],
    instances: {},
    functionEntrance: function (info) {

        if (!this.running) {
            return;
        }
        var key = info.module + ' ' + info.name + ':' + info.range[0];
        if (this.hits.hasOwnProperty(key)) {
            this.hits[key] = this.hits[key] + 1;
        } else {
            this.hits[key] = 1;
        }
        var instanceIndex = -1;
        if (info.className) {
            for (var index = this.instances[info.className].length - 1; index >= 0; index--) {
                if (info.thisRef === this.instances[info.className][index]) {
                    instanceIndex = index;
                }
            }
        }

        var data = {
            type: 'entry',
            name: info.name,
            className: info.className,
            module: info.module,
            params: info.params
        };
        if (instanceIndex != -1) {
            data.instance = instanceIndex;
        }
        this.calls.push(data);

    },
    functionExit: function (info) {
        if (!this.running) {
            return;
        }
        var key = info.name + ':' + info.range[0];
        if (this.hits.hasOwnProperty(key)) {
            this.hits[key] = this.hits[key] + 1;
        } else {
            this.hits[key] = 1;
        }
        this.calls.push({type: 'exit', name: info.name, module: info.module, params: info.params});

    },
    methodEntrance: function (info) {
        if (!this.running) {
            return;
        }
        var key = info.module + ' ' + info.name + ':' + info.range[0];
        if (this.hits.hasOwnProperty(key)) {
            this.hits[key] = this.hits[key] + 1;
        } else {
            this.hits[key] = 1;
        }
        var instanceIndex = -1;
        if (info.className) {
            for (var index = this.instances[info.className].length - 1; index >= 0; index--) {
                if (info.thisRef === this.instances[info.className][index]) {
                    instanceIndex = index;
                }
            }
        }

        var data = {
            type: 'entry',
            name: info.name,
            className: info.className,
            module: info.module,
            params: info.params
        };
        if (instanceIndex != -1) {
            data.instance = instanceIndex;
        }
        this.calls.push(data);

    },
    methodExit: function (info) {
        if (!this.running) {
            return;
        }
        var key = info.module + ' ' + info.name + ':' + info.range[0];
        if (this.hits.hasOwnProperty(key)) {
            this.hits[key] = this.hits[key] + 1;
        } else {
            this.hits[key] = 1;
        }
        var instanceIndex = -1;
        if (info.className) {
            for (var index = this.instances[info.className].length - 1; index >= 0; index--) {
                if (info.thisRef === this.instances[info.className][index]) {
                    instanceIndex = index;
                }
            }
        }

        var data = {type: 'exit', name: info.name, className: info.className, module: info.module, params: info.params};
        if (instanceIndex != -1) {
            data.instance = instanceIndex;
        }
        this.calls.push(data);

    },
    constructorEntrance: function (info) {
        if (this.instances[info.className] === undefined) {
            this.instances[info.className] = [];
        }
        this.instances[info.className][this.instances[info.className].length] = info.thisRef;

    },
    callFunction: function (info) {
        if (!this.running) {
            return;
        }
        var key = info.module + ' ' + info.name + ':' + info.range[0];

        this.calls.push({type: 'call', name: info.name, module: info.module});
        if (this.hits.hasOwnProperty(key)) {
            this.hits[key] = this.hits[key] + 1;
        } else {
            this.hits[key] = 1;
        }
        return true;
    },
    startReport: function () {
        this.running = true;
    },
    stopReport: function () {
        this.running = false;
    },
    genReport: function (toStdout) {
        that = this;
        var extrapolated = {
            calls: []
        };

        var contextStack = [{
            module: this.calls[0].module,
            function: 'MainExecutionThread'
        }];

        function getCaller(name, root, index) {
            var caller = null;
            for (var i = index-1 ; i >= 0; i--) {

                if (name == root[i].name) {

                    caller = root[i];
                    if(caller.function ===undefined){
                        caller.function = 'MainExecutionThread';
                    }
                    break;
                }
            }
            return caller;
        }
        this.calls.map(function (stack, index) {

            if (stack.type == 'exit') {
                contextStack.pop();
            }

            if (stack.type == 'entry') {

                var caller = {
                    "module": contextStack[contextStack.length - 1].module,
                    "function": contextStack[contextStack.length - 1].function
                };

                if (contextStack[contextStack.length - 1].instance !== undefined) {
                    caller.instance = contextStack[contextStack.length - 1].instance;
                }

                if (contextStack[contextStack.length - 1].className !== undefined) {
                    caller.className = contextStack[contextStack.length - 1].className;
                }

                var backTrackedCaller = getCaller(stack.name, that.calls, index)


                if (backTrackedCaller && backTrackedCaller.module != caller.module) {

                    caller = {
                        module: backTrackedCaller.module,
                        function: backTrackedCaller.function
                    };

                    if (backTrackedCaller.instance !== undefined) {
                        caller.instance = backTrackedCaller.instance;
                    }

                    if (backTrackedCaller.className !== undefined) {
                        caller.className = backTrackedCaller.className;
                    }
                }
                var callee = {
                    "module": stack.module,
                    "function": stack.name
                };

                if (stack.instance !== undefined) {
                    callee.instance = stack.instance;
                }

                if (stack.className !== undefined) {
                    callee.className = stack.className;
                }


                extrapolated.calls.push({
                    "caller": caller,
                    "callee": callee,
                    "params": (stack.params.length === 1?[stack.params[0]]:Array.apply(null, stack.params))

                });


                var stackData = {
                    module: stack.module,
                    function: stack.name
                };

                if (stack.className !== undefined) {
                    stackData.className = stack.className;
                }
                if (stack.instance !== undefined) {
                    stackData.instance = stack.instance;
                }


                contextStack.push(stackData);


            }

        });

        var modulesDict = {}, classesDict = {};

        function addFunc(moduleName, functionData) {

            var placeholder, placeHolder2;
            if (functionData.className) {
                placeholder = classesDict[moduleName];
                if (!placeholder) {
                    classesDict[moduleName] = {};
                    placeholder = classesDict[moduleName]
                }
                var placeholder2 = placeholder[functionData.className + '#' + functionData.instance];
                if (!placeholder2) {
                    placeholder[functionData.className + '#' + functionData.instance] = {};
                    placeholder2 = placeholder[functionData.className + '#' + functionData.instance]
                }
                placeholder2[functionData.name] = functionData;
            } else {
                placeholder = modulesDict[moduleName];
                if (!placeholder) {
                    modulesDict[moduleName] = {};
                    placeholder = modulesDict[moduleName]
                }
                placeholder[functionData.name] = functionData;
            }


        }

        extrapolated.calls.map(function (call) {
            var caller = {
                name: call.caller.function,
                module: call.caller.module
            };

            if (call.caller.instance !== undefined) {
                caller.instance = call.caller.instance
            }

            if (call.caller.className !== undefined) {
                caller.className = call.caller.className
            }

            var callee = {
                name: call.callee.function,
                module: call.callee.module
            };

            if (call.callee.instance !== undefined) {
                callee.instance = call.callee.instance
            }

            if (call.callee.className !== undefined) {
                callee.className = call.callee.className
            }

            addFunc(call.caller.module, caller);
            addFunc(call.callee.module, callee);
        });

        extrapolated.modules = Object.keys(modulesDict).map(function (modName) {
            return {
                name: modName,
                functions: Object.keys(modulesDict[modName]).map(function (a) {
                    return modulesDict[modName][a];
                }),
                classes: classesDict[modName]
            };
        });

        function printNode() {
            if (toStdout) {
                process.stdout.write(extrapolated);
            } else {
                var now = new Date();
                var timestamp = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '_' +
                    now.toString().split(' ')[4];
                var fs = require('fs');
                fs.writeFileSync('./report' + timestamp + '.json', JSON.stringify(extrapolated, null, 4));
            }
        }

        function printBrowser() {
            if (toStdout) {
                console.log(extrapolated);
            } else {

            }
        }


        printNode();
    }
};