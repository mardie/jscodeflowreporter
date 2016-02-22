var Dog = global.__codeFlowReporter.callFunction({ name: "require", module: "opp2.js", lineNumber: 1, range: [10,30] })&&require('./opp1.js');

var lassie = new Dog('Lassie');

global.__codeFlowReporter.callFunction({ name: "bringNewspaper", module: "opp2.js", lineNumber: 5, range: [66,89] })&&lassie.bringNewspaper();

