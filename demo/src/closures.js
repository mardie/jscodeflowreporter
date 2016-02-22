function log(str){
    console.log(str);
}

function getCounter( counterName) {
    var value = 0;
    return function() {
        value += 1;
        log(value)
    };
}

var counter = getCounter();

counter();
counter();
counter();
counter();
