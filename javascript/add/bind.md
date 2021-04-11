# 함수 바인딩

```javascript
let user = {
    firtsName: 'John',
    sayHi() {
        console.log(`Hello, ${this.firtsName}`);    \
        }
};
```

### 사라진 'this'
```javascript
setTimeout(user.sayHi, 1000); // Hello, undefined!
```

### 방법 1:래퍼
```javascript
setTimeout(function() {
    user.sayHi();
}, 1000);
```

### 방법 1의 취약성
```javascript
user = {sayHi() { console.log('다른사용자');}};   //user가 변경되면 변경된 객첸의 메서드를 호출하게 됩니다.
```

### 방법 2:bind
```javascript
let sayHi = user.sayHi.bind(user);

// 이제 객체 없이도 객체 메서드를 호출할 수 있습니다.
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// 1초 이내에 user 값이 변화해도 sayHi는 기존 값을 사용합니다.
user = {
    sayHi() { console.log('또 다른 사용자!'); }
};
```