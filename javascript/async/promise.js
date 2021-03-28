"use strict";

// Promis is a JavaScript object for asynchronous peration.
// state: pending -> fulfilled or rejected
// producer vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically.

const promise = new Promise((resolve, reject) => {
    // network, read files
    setTimeout(() => {
        resolve("whitecrow");
        //reject(new Error('no network'));
    }, 2000);
});

// 2. Consumers: then, catch, finally
promise
    .then((value) => {
        console.log(value);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("finally");
    });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

fetchNumber
    .then((num) => num * 2)
    .then((num) => num * 3)
    .then((num) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(num - 1), 1000);
        });
    })
    .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve("hen"), 1000);
    });
const getEgg = (hen) =>
    new Promise((resolve, reject) => {
        //setTimeout(() => resolve(`${hen} => egg`), 1000);
        setTimeout(() => reject(new Error(`error! ${hen} => egg`)), 1000);
    });
const cook = (egg) =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => fry`), 1000);
    });

getHen()
    .then((hen) => getEgg(hen)) //.then(getEgg) > 이렇게 쓸 수 있음
    .catch((error) => {
        return "빵";
    })
    .then((egg) => cook(egg))
    .then((meal) => console.log(meal));
