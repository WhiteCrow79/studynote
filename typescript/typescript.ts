interface User {
    name : string;
    age : number;
}

class UserAccount {
    name : string;
    age : number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const user: User = new UserAccount('whietecrow', 27);

console.log(user);