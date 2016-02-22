#!/usr/bin/env node
var esprima = require('esprima');
var esmorph = require('esmorphcodeflow');
var path = require('path');
var fs = require('fs');
var glob = require("glob");
var mkdirp = require("mkdirp");
var argv = require('minimist')(process.argv.slice(2));
require('./include.codeFlowReporter');

var usage = fs.readFileSync('./usage.txt','utf8');

var config = {}, globOptions = {};

function count(x, s, p) {
    return (x === 1) ? (x + ' ' + s) : (x + ' ' + p);
}

if(!argv._.length){
    process.stderr.write("Error: No input files(s) provided\n");
    process.stderr.write(usage);
}

config.files = argv._;

if(argv.o){
    config.outputFolder = argv.o;
}


modifyFiles(config.files);

function modifyFiles(files){
    files.map(function(file) {
        glob(file, globOptions, function (er, files) {
            files.map(function (file) {
                var fileName = path.basename(file);
                var fileContent = fs.readFileSync(file, 'utf8');
                modifyFile(fileContent, fileName)
            });
        })
    });
}

function modifyFile(code,fileName) {
    try {
        var options = null;

        var tracer = esmorph.Tracer.ExpressionCall(function (fn) {

            var signature = 'global.__codeFlowReporter.callFunction({ ';
            signature += 'name: "' + fn.name + '", ';
            signature += 'module: "' + fileName + '", ';
            signature += 'lineNumber: ' + fn.loc.start.line + ', ';
            signature += 'range: [' + fn.range[0] + ',' + fn.range[1] + ']';
            signature += ' })&&';
            return signature;
        });


        var tracer2 = esmorph.Tracer.FunctionEntrance(function (fn) {

            var signature = 'global.__codeFlowReporter.functionEntrance({ ';
            signature += 'name: "' + fn.name + '", ';
            signature += 'module: "' + fileName + '", ';
            signature += 'params: arguments, ';
            signature += 'lineNumber: ' + fn.loc.start.line + ', ';
            signature += 'range: [' + fn.range[0] + ',' + fn.range[1] + ']';
            signature += ' });';
            return signature;
        });

        var tracer3 = esmorph.Tracer.FunctionExit(function (fn) {

            var signature = ';global.__codeFlowReporter.functionExit({ ';
            signature += 'name: "' + fn.name + '", ';
            signature += 'module: "' + fileName + '", ';
            signature += 'params: arguments, ';
            signature += 'lineNumber: ' + fn.loc.start.line + ', ';
            signature += 'range: [' + fn.range[0] + ',' + fn.range[1] + ']';
            signature += ' });';
            return signature;
        });


        var tracer4 = esmorph.Tracer.MethodEntrance(function (fn) {

            var signature = 'global.__codeFlowReporter.methodEntrance({ ';
            signature += 'name: "' + fn.name + '", ';
            signature += 'module: "' + fileName + '", ';
            signature += 'params: arguments, ';
            signature += 'className: "' + fn.className + '", ';
            signature += 'thisRef: this, ';
            signature += 'lineNumber: ' + fn.loc.start.line + ', ';
            signature += 'range: [' + fn.range[0] + ',' + fn.range[1] + ']';
            signature += ' });';
            return signature;
        });

        var tracer5 = esmorph.Tracer.MethodExit(function (fn) {

            var signature = 'global.__codeFlowReporter.methodExit({ ';
            signature += 'name: "' + fn.name + '", ';
            signature += 'module: "' + fileName + '", ';
            signature += 'params: arguments, ';
            signature += 'className: "' + fn.className + '", ';
            signature += 'thisRef: this, ';
            signature += 'lineNumber: ' + fn.loc.start.line + ', ';
            signature += 'range: [' + fn.range[0] + ',' + fn.range[1] + ']';
            signature += ' });';
            return signature;
        });


        var tracer6 = esmorph.Tracer.ConstructorEntrance(function (fn) {

            var signature =   'global.__codeFlowReporter.constructorEntrance({ ';
            signature += 'name: "' + fn.name + '", ';
            signature += 'module: "' + fileName + '", ';
            signature += 'params: arguments, ';
            signature += 'className: "' + fn.className + '", ';
            signature += 'thisRef: this, ';
            signature += 'lineNumber: ' + fn.loc.start.line + ', ';
            signature += 'range: [' + fn.range[0] + ',' + fn.range[1] + ']';
            signature += ' });';
            return signature;
        });

        code2 = esmorph.modify(code, [tracer, tracer2,  tracer3, tracer4, tracer5, tracer6 ]);

        if(config.outputFolder) {
            var outputPath = path.join(config.outputFolder, fileName)
            mkdirp.sync(path.dirname(outputPath));

            fs.writeFileSync(outputPath, code2);
        }else{
            process.stdout.write(code2);
        }

    } catch (e) {
        console.error(e);
    }
}