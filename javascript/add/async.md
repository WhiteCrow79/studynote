# promise와 async, await

## callback

자바스트립트 호스트 환경이 제공하는 여러 함수를 사용하면 비동기(asynchronous)동작을 스케줄링 할 수 있음.

```javascript
function loadScript(src) {
    // <script> 태그를 만들고 페이지에 태그를 추가합니다.
    // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행합니다.
    let script = document.createElement('script');
    script.src = src;

    document.head.append(script);
}

loadScript('./js/script.js');
newFunction(); //Uncaught ReferenceError: newFunction is not defined
```

```javascript
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
}

loadScript('./js/script.js', function() {
    newFunction();  //정상호출
});
``` 

## promise

new Promise에 전달되는 함수는 executor(실행자, 실행 함수)라고 부른다. executor는 new promise가 만들어질 때 자동으로 실행
```javascript
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), 1000);
});

//resolve 함수는 .then의 첫 번째 함수(인수)를 실행
promise.then(
    result => alert(result), //1초 후 'done'출력
    error => alert(error) //실행되지 않음
);

```

