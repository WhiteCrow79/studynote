# 기본적인 리팩토링

## 함수 추출하기(Extract Function)

> 목적과 구현을 분리  

```javascript
function printOwing(invoice) {
    let outstanding = 0;

    console.log("********************");
    console.log("**** 고객 채무 ****");
    console.log("********************");

    // 미해결 채무 (outstanding)을 계산한다.
    for (const o of invoice) {
        outstanding += o.amount;
    }

    // 마감일(dueDate)을 기록한다.
    const today = Clock.today;
    invoice.dueDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 30
    );

    //세부 사항을 출력한다.
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
```

```javascript
function printOwing(invoice) {
    printBanner();
    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetails(invoice, outstanding);
}

function printBanner() {
    console.log("********************");
    console.log("**** 고객 채무 ****");
    console.log("********************");
}

function calculateoutstanding(invoice) {
    let result = 0;
    for (const o of invoice) {
        result += o.amount;
    }
    return result;
}

function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 30
    );
}

function printDetails(invoice, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
```

## 함수 인라인하기(Inline Function)

```javascript
function reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}

function gatherCustomerData(out, aCustomer) {
    out.push([("name": aCustomer.name)]);
    out.push([("location": aCustomer.location)]);
}
```

```javascript
function reportLines(aCustomer) {
    const lines = [];
    lines.push([("name": aCustomer.name)]);
    lines.push([("location": aCustomer.location)]);
    return lines;
}
```

## 변수 추출하기(Extract Variable)

```javascript
class Order {
    constructor(aRecord) {
        this._data = aRecord;
    }

    get quantity() {
        return this._data.quantity;
    }
    get itemPrice() {
        return this._data.itemPrice;
    }

    get price() {
        return (
            this.quantity * this.itemPrice -
            Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
            Math.min(this.quantity * this.itemPrice * 0.1, 100)
        );
    }
}
```

```javascript
class Order {
    constructor(aRecord) {
        this._data = aRecord;
    }

    get quantity() {
        return this._data.quantity;
    }
    get itemPrice() {
        return this._data.itemPrice;
    }

    get price() {
        return this.basePrice - this.quantityDiscount + this.shipping;
    }

    get basePrice() {
        return this.quantity * this.itemPrice;
    }
    get quantityDiscount() {
        return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
    }
    get shipping() {
        return Math.min(this.basePrice * 0.1, 100);
    }
}
```

## 변수 인라인하기(Inline Variable)

```javascript
let basePrice = anOrder.basePrice;
return basePrice > 1000;
```

```javascript
return anOrder.basePrice > 1000;
```

## 함수 선언 바꾸기(Change Function Declaration)

```javascript
function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(
        aCustomer.address.state
    );
}

const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
```

```javascript
function inNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

const newEnglanders = someCustomers.filter((c) =>
    inNewEngland(c.address.state)
);
```

## 변수 캡슐화하기(Encapsulate Variable)

```javascript
let defaultOwnerData = { firstName: "white", lastName: "crow" };
export function defaultOwner() {
    return new Person(defaultOwnerData);
}
export function setDefaultOwner(arg) {
    defaultOwnerData = arg;
}

class Person {
    constructor(data) {
        this._lastName = data.lastName;
        this._firstName = data.firstName;
    }
    get lastName() {
        return this._lastName;
    }
    get firstName() {
        return this._firstName;
    }
}
```

## 변수 이름 바꾸기(Encapsulate Variable)

```javascript
let a = height * width;
```

```javascript
let area = height * width;
```

## 매개변수 객체 만들기(Introduce Parameter Object)

```javascript
const station = {
    name: "Z81",
    readings: [
        { temp: 47, time: "2021-02-18 21:57" },
        { temp: 53, time: "2021-02-18 22:57" },
        { temp: 58, time: "2021-02-18 23:57" },
        { temp: 51, time: "2021-02-18 21:59" },
    ],
};

function readingsOutsideRange(station, min, max) {
    return station.readings.filter((r) => r.temp < min || r.temp > max);
}

const alerts = readingsOutsideRange(
    station,
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling
);
```

```javascript
class NumberRange {
    constructor(min, max) {
    this._data = { min: min, max: max };
    }

    get min() {
    return this._data.min;
    }
    get max() {
    return this._data.max;
    }

    contains(arg) {
    return arg >= this.min && arg <= this.max;
    }
}

function readingsOutsideRange(station, range) {
    return station.readings.filter(
    (r) => !range.contains(r.temp));
    );
}

const range = new NumberRange(
    operatingPlan.temperatureFloor,
    operatingPlan.temperatureCeiling
);

const alert = readingOutsideRange(station, range);
```

## 여러 함수를 클래스로 묶기(Combine Functions into Class)

```javascript
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
const taxableCharge = Math.max(
    0,
    basicChargeAmount - taxThreshold(aReading.year)
);

function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

```javascript
class Reading {
    constructor(data) {
        this._customer = data.customer;
        this._quantity = data.quantity;
        this._month = data.month;
        this._year = data.year;
    }

    get customer() {
        return this._customer;
    }
    get quantity() {
        return this._quantity;
    }
    get month() {
        return this._month;
    }
    get year() {
        return this._year;
    }
    get baseCharge() {
        return baseRate(this.month, this.year) * this.quantity;
    }
    get taxableCharge() {
        Math.max(0, this.baseCharge - taxThreshold(this.year));
    }
}

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
//const baseChage = aReading.baseCharge;
const taxableCharge = aReading.taxableCharge;
```

## 여러 함수를 변환함수로 묶기

```javascript
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
const taxableCharge = Math.max(
    0,
    basicChargeAmount - taxThreshold(aReading.year)
);

function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

```javascript
function enrichReading(original) {
    const result = _.cloneDeep(original); //lodash 라이브러리
    result.baseCharge = calculateBaseCharge(result);
    result.taxableCharge = Math.max(
        0,
        result.baseCharge - taxThreshold(result.year)
    );
    return result;
}
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
//const basicChargeAmount = aReading.baseCharge;
const taxableCharge = aReading.taxableCharge;
```

## 단계 쪼개기

```javascript
function priceOrder(product, quantity, shippingMethod) {
    const basePrice = product.basePrice * quantity;
    const discount =
        Math.max(quantity - product.discountThreshold, 0) *
        product.basePrice *
        product.discountRate;
    const shippingPerCase =
        basePrice > shippingMethod.discountThreshold
            ? shippingMethod.discountedFee
            : shippingMethod.feePerCase;
    const shippingCost = quantity * shippingPerCase;
    const price = basePrice - discount + shippingCost;
    return price;
}
```

```javascript
function priceOrder(product, quantity, shippingMethod) {
    const priceData = calculatePricingData(product, quantity);
    return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount =
        Math.max(quantity - product.discountThreshold, 0) *
        product.basePrice *
        product.discountRate;
    return {
        basePrice: basePrice,
        quantity: quantity,
        discount: discount,
    };
}

function applyShipping(priceData, shippingMethod) {
    const shippingPerCase =
        priceData.basePrice > shippingMethod.discountThreshold
            ? shippingMethod.discountedFee
            : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - priceData.discount + shippingCost;
    return price;
}
```
