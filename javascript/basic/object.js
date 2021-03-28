// const name = 'whitecrow';
// const age = 4;

// print(name, age);
// function print(name, age) {
//     console.log(name);
//     console.log(age);
// }

// object = { key : value}

// 1. Literals and properties
const obj1 = {};
const obj2 = new Object();

function print(person) {
    console.log(person.name);
    console.log(person.age);
}

const person = {
    name: "whitecrow",
    age: 43,
};
print(person);

//추후에 추가 가능 javascript란...
person.hasJob = true;
console.log(person.hasJob);

delete person.hasJob;
console.log(person.hasJob);

// 2. Computed properties
console.log(person.name);
console.log(person["name"]); //키는 항상 string

person["hasJob"] = true;
console.log(person.hasJob);

//둘을 언제 쓰나
//코딩할땐 . 어떤게 들어올지 모를때 배열

function printValue(obj, key) {
    //console.log(obj.key); X
    console.log(obj[key]); // O
}

printValue(person, "name");

// 3. Property value shorthand
const person1 = {
    name: "bob",
    age: 2,
};
const person2 = {
    name: "steve",
    age: 4,
};
//...
const person4 = makePerson("whitecrow", 43);
console.log(person4);

function makePerson(name, age) {
    return {
        name,
        age,
    };
}

// 4. Constructor Fuction
const person5 = new Person("whitecrow2222", 43);

function Person(name, age) {
    // this = {};
    this.name = name;
    this.age = age;
    // return this;
}

// 5. check (key in obj)
console.log("name" in person);
console.log("age" in person);
console.log("hasJob" in person);

// 6. for..in vs for..of
// for (key in obj)
for (key in person) {
    console.log(key);
}

// for(value of iterable)
const array = [1, 2, 4, 5];
for (value of array) {
    console.log(value);
}

// 7. Fun cloning
//Object.assign(desc, [obje1, obj2, obj3...])

const user = {
    name: "whitecrow",
    age: "43",
};
const user2 = user;
user2.name = "corder";
console.log(user);

// 예전 방법
const user3 = {};
for (key in user) {
    user3[key] = user[key];
}
console.log(user3);

// 방법
const user4 = Object.assign({}, user);
console.log(user4);

//다른 예제
const fruit1 = {
    color: "red",
};
const fruit2 = {
    color: "blue",
    size: 27,
};

const mixfruit = Object.assign({}, fruit1, fruit2);
console.log(mixfruit);
