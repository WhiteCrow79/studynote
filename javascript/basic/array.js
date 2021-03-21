//자료구조

'user strict';

// Array

// 1. Declaration
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position
const fruits = ['사과', '바나나'];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);

// 3. looping
// for of
for(let fruit of fruits) {
    console.log(fruit);
}

// forEach
fruits.forEach((fruit) => console.log(fruit));

// 4. Addtion, deletion, copy
// 제일 뒤에 넣기 push, 제일 뒤에 빼기 pop
fruits.push('딸기', '복숭아');
console.log(fruits);

fruits.pop();
console.log(fruits);

// 앞에 넣기/빼기 >> 속도 느림 안씀
fruits.unshift('수박', '참외');
console.log(fruits);

fruits.shift();
console.log(fruits);

// 원하는 곳에
fruits.splice(0, 2);
console.log(fruits);

//combine
const fruits2 = ['멜론', '옥수수'];
const newfruits = fruits.concat(fruits2);

console.log(newfruits);


// 5. Searching
console.clear();
//indexOf: number, lastIndexOf, includes: boolean
