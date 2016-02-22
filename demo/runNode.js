require('./../include.codeFlowReporter.js');
require('./../include.codeFlowReporter.js');

global.__codeFlowReporter.startReport();


require('./output/opp1');
require('./output/opp2');

/*
require('./output/closures');
*/

global.__codeFlowReporter.stopReport();
global.__codeFlowReporter.genReport();

