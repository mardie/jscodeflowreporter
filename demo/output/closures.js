function log(str){global.__codeFlowReporter.functionEntrance({ name: "log", module: "closures.js", params: arguments, lineNumber: 1, range: [0,153] });
    global.__codeFlowReporter.callFunction({ name: "log", module: "closures.js", lineNumber: 2, range: [23,39] })&&console.log(str);;global.__codeFlowReporter.functionExit({ name: "log", module: "closures.js", params: arguments, lineNumber: 1, range: [0,286] });
}

function getCounter( counterName) {global.__codeFlowReporter.functionEntrance({ name: "getCounter", module: "closures.js", params: arguments, lineNumber: 5, range: [155,394] });
    var value = 0;
    ;global.__codeFlowReporter.functionExit({ name: "getCounter", module: "closures.js", params: arguments, lineNumber: 5, range: [288,813] });return function() {global.__codeFlowReporter.functionEntrance({ name: "anonfunction", module: "closures.js", params: arguments, lineNumber: 7, range: [221,391] });
        value += 1;
        global.__codeFlowReporter.callFunction({ name: "log", module: "closures.js", lineNumber: 9, range: [151,161] })&&log(value);global.__codeFlowReporter.functionExit({ name: "anonfunction", module: "closures.js", params: arguments, lineNumber: 7, range: [496,810] });
    };
}

var counter = global.__codeFlowReporter.callFunction({ name: "getCounter", module: "closures.js", lineNumber: 13, range: [186,198] })&&getCounter();

global.__codeFlowReporter.callFunction({ name: "counter", module: "closures.js", lineNumber: 15, range: [201,210] })&&counter();
global.__codeFlowReporter.callFunction({ name: "counter", module: "closures.js", lineNumber: 16, range: [212,221] })&&counter();
global.__codeFlowReporter.callFunction({ name: "counter", module: "closures.js", lineNumber: 17, range: [223,232] })&&counter();
global.__codeFlowReporter.callFunction({ name: "counter", module: "closures.js", lineNumber: 18, range: [234,243] })&&counter();
