'use strict';

class Animal{
    constructor(){

    }
    think() {
    }
}


class Dog extends Animal{
    constructor(name){
        super();
        this.name = name ||'Snow';
    }

    walk(input){
        this.think(1,'Str',[2, null, 'b'],{foo:{bar:'baz'}});
        this.moveLeg();
    }
    moveLeg(){

    }

    bringNewspaper(){

    }
    sayName(){
        log('Woo' + this.name + 'off');
    }

    scratch(dog){
        dog.receiveScratch();
    }

    receiveScratch(){

    }


}

function log(str){
    console.log(str);
}


let pluto = new Dog('Pluto');
let unamed = new Dog();

pluto.walk();

unamed.scratch(pluto);


module.exports = Dog;
