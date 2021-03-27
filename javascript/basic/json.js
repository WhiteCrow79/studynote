//HTTP : Hypertext Transfer Protocol
//AJAX : Asynchronous JavaScript And XML
//XHR : XMLHttpRequest
//fetch() API >> ie 사용안됨

//xml 대신 json
//JSON : Javascrip Object Notation : ECMAScript 3rd 1999 : 직렬화

// 1. Object ot JSON
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple', 'banana']);
console.log(json);

const rabbit = {
    name: 'tory',
    color: 'white',
    size: null,
    birthDate: new Date(),
    jump: () => console.log(`${name} can jump`),
};

json = JSON.stringify(rabbit);
console.log(json); //함수는 object에 있는 데이터가 아니기 때문에 json에 포함되지 않음

//원하는 property만 정의

json = JSON.stringify(rabbit, ['name', 'color', 'size']);
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'name' ? 'whitecrow' : value;
});
console.log(json);


// 2. JSON to Object
// parse(json)
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => {
    console.log(`key: ${key}, value: ${value}`);
    return key === 'birthDate' ? new Date(value) : value;
});
console.log(obj);
//rabbit.jump();
//obj.jump();

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate.getDate()); //이미 string 타입이라 안됨


//유용한 site
//JSON Diff
//JSON Beautifier
//JSON Validator