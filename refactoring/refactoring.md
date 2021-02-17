## 기본적인 리팩토링

- ### 함수 추출하기(Extract Function)

  - 목적과 구현을 분리

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

- ### 함수 인라인하기(Inline Function)

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

- ### 변수 추출하기(Extract Variable)

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

- ### 변수 인라인하기(Inline Variable)
  ```javascript
  let basePrice = anOrder.basePrice;
  return basePrice > 1000;
  ```
  ```javascript
  return anOrder.basePrice > 1000;
  ```
- ### 함수 선언 바꾸기(Change Function Declaration)

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

- 변수 이름 바꾸기
- 변수 캡슐화하기
- 매개변수 객체 만들기
- 여러 함수를 클래스로 묶기
- 단계 쪼개기
