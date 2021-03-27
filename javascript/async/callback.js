'use string';

// JavaScript is synchronous. 동기
// hoisting >> var, function declaration 자동적으로 제일 위로 올라감

console.log('1');
setTimeout(() => console.log('2'), 1000); //setTime browser API
console.log('3');

// Synchronous callback
function printImmediately(print) {
    print();
}

printImmediately(() => console.log('hello'));

// Asynchronous callback
function printWithDelay(print, timeout) {
    setTimeout(print, timeout);
}

printWithDelay(() => console.log('async callack'), 2000);

//콜백 지옥 : 가독성이 떨어짐, 디버깅 어려움

class UserStorage {
    loginUser(id, password, onSuccess, onError) {
        setTimeout(() => {
            if (
                (id === 'whitecrow' && password === 'test') ||
                (id === 'coder' && password === 'test1')
            ) {
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
        }, 2000);
    }

    getRoles(user, onSuccess, onError) {
        setTimeout(() => {
            if (user === 'whitecrow') {
                onSuccess({
                    name: 'whitecrow',
                    role: 'admin'
                });
            } else {
                onError(new Error('no access'));
            }
        }, 1000);
    }
}

const userStorage = new UserStorage();
//const id = prompt('enter your id');
//const password = prompt('enter your password');
const id = 'whitecrow';
const password = 'test';

userStorage.loginUser(
    id,
    password,
    user => {
        userStorage.getRoles(
            user,
            userWithRole => {
                console.log(`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`);
            },
            error => {
                console.log(error);
            }
        );
    },
    error => {
        console.log(error)
    });