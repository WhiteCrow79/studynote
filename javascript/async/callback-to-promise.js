'use string';

//callback to promise
class UserStorage {
    loginUser(id, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(
                    (id === 'whitecrow' && password === 'test') ||
                    (id === 'coder' && password === 'test1')
                ) {
                    resolve(id);
                } else {
                    reject(new Error('not found'));
                }
            }, 2000);
        });
    }

    getRoles(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(user === 'whitecrow') {
                    resolve({name: 'whitecrow', role: 'admin'});            
                } else {
                    reject(new Error('no access'));
                }
            }, 1000);
        });
    }
}

const userStorage = new UserStorage();
//const id = prompt('enter your id');
//const password = prompt('enter your password');
const id = 'whitecrow';
const password = 'test';

userStorage.loginUser(id, password)
.then(user => userStorage.getRoles(user))
.then(user => console.log(`Hello ${user.name}, you have a ${user.role} role`))
.catch(console.log);