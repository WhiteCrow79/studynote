//async await
//promise 보다 조금 간결하게 동기적으로 보이게 함
//syntactic sugar

// 1. async
async function fetchUser() {
    // do network request in 10 sec
    return 'whieteCrow';
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getApple() {
    await delay(2000);
    //throw 'apple error';
    return '사과';
}

async function getBanana() {
    await delay(1000);
    return '바나나';
}

//function pickFruits() {
async function pickFruits() {    
    // return getApple().then(apple => {
    //     return getBanana().then(banana => `${apple} and ${banana}`);
    // });
    //try {
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    // const apple = await getApple(); //2초
    // const banana = await getBanana(); //2초
    return `${apple} and ${banana}`; //4초 ....      
    //}
    //catch {

    //}

}

pickFruits().then(console.log);

// 3. useful Promis APIs
function pickAllFruits() {
    return Promise.all([getApple(), getBanana()])
    .then(fruits => fruits.join(' and '));
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
    return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);