function addPlus(a) {
    return function (b) {
        return a + b;
    }
}

let addPlus2 = addPlus(2);
console.log(addPlus2(3));