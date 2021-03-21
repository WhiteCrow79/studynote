'use strict';

class countIncrease {
    constructor(fn) {
        this.count = 0;
        this.callbackFn = fn;
    }

    increase() {
        this.count++;        
        console.log(this.count);
        if(this.count % 5 === 0) {
            this.callbackFn && this.callbackFn(this.count);
        }
    }
}

function operation1(num) {
    console.log(`wow num ${num}`);
}

function operation2(num) {
    console.log(`yo num ${num}`);
}

const conCountIncrease = new countIncrease(operation1);
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();
conCountIncrease.increase();

const con2CountIncrease = new countIncrease(operation2);
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();
con2CountIncrease.increase();