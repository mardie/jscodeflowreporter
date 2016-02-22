'use strict';

class Animal{
    constructor(){global.__codeFlowReporter.constructorEntrance({ name: "constructor", module: "opp1.js", params: arguments, className: "Animal", thisRef: this, lineNumber: 4, range: [33,54] });

    }
    think() {global.__codeFlowReporter.methodEntrance({ name: "think", module: "opp1.js", params: arguments, className: "Animal", thisRef: this, lineNumber: 7, range: [59,74] });global.__codeFlowReporter.methodExit({ name: "think", module: "opp1.js", params: arguments, className: "Animal", thisRef: this, lineNumber: 7, range: [59,239] });
    }
}


class Dog extends Animal{
    constructor(name){
        super();global.__codeFlowReporter.constructorEntrance({ name: "constructor", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 13, range: [436,512] });
        this.name = name ||'Snow';
    }

    walk(input){global.__codeFlowReporter.methodEntrance({ name: "walk", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 18, range: [191,521] });
        global.__codeFlowReporter.callFunction({ name: "think", module: "opp1.js", lineNumber: 19, range: [212,264] })&&this.think(1,'Str',[2, null, 'b'],{foo:{bar:'baz'}});
        global.__codeFlowReporter.callFunction({ name: "moveLeg", module: "opp1.js", lineNumber: 20, range: [274,288] })&&this.moveLeg();global.__codeFlowReporter.methodExit({ name: "walk", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 18, range: [356,850] });
    }
    moveLeg(){global.__codeFlowReporter.methodEntrance({ name: "moveLeg", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 22, range: [526,543] });global.__codeFlowReporter.methodExit({ name: "moveLeg", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 22, range: [855,1039] });

    }

    bringNewspaper(){global.__codeFlowReporter.methodEntrance({ name: "bringNewspaper", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 26, range: [549,573] });global.__codeFlowReporter.methodExit({ name: "bringNewspaper", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 26, range: [1045,1243] });

    }
    sayName(){global.__codeFlowReporter.methodEntrance({ name: "sayName", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 29, range: [578,744] });
        global.__codeFlowReporter.callFunction({ name: "log", module: "opp1.js", lineNumber: 30, range: [371,401] })&&log('Woo' + this.name + 'off');global.__codeFlowReporter.methodExit({ name: "sayName", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 29, range: [1248,1581] });
    }

    scratch(dog){global.__codeFlowReporter.methodEntrance({ name: "scratch", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 33, range: [750,920] });
        global.__codeFlowReporter.callFunction({ name: "receiveScratch", module: "opp1.js", lineNumber: 34, range: [436,456] })&&dog.receiveScratch();global.__codeFlowReporter.methodExit({ name: "scratch", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 33, range: [1587,1924] });
    }

    receiveScratch(){global.__codeFlowReporter.methodEntrance({ name: "receiveScratch", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 37, range: [926,950] });global.__codeFlowReporter.methodExit({ name: "receiveScratch", module: "opp1.js", params: arguments, className: "Dog", thisRef: this, lineNumber: 37, range: [1930,2128] });

    }


}

function log(str){
    global.__codeFlowReporter.callFunction({ name: "log", module: "opp1.js", lineNumber: 45, range: [522,538] })&&console.log(str);
}


let pluto = new Dog('Pluto');
let unamed = new Dog();

global.__codeFlowReporter.callFunction({ name: "walk", module: "opp1.js", lineNumber: 52, range: [599,611] })&&pluto.walk();

global.__codeFlowReporter.callFunction({ name: "scratch", module: "opp1.js", lineNumber: 54, range: [614,635] })&&unamed.scratch(pluto);


module.exports = Dog;
