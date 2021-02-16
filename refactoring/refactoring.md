## 기본적인 리팩토링

- ### 함수 추출하기

  - 목적과 구현을 분리

  <pre>
    <code>
    function printOwing(invoice) {
      let outstanding = 0;
      
      console.log('********************');
      console.log('**** 고객 채무 ****');
      console.log('********************');
      
      // 미해결 채무 (outstanding)을 계산한다.
      for(const o of invoice) {
        outstanding += o.amount;
      }
      
      // 마감일(dueDate)을 기록한다.
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
      
      //세부 사항을 출력한다.
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
    }
    </code>
  </pre>
  <pre>
    <code>
    function printOwing(invoice) {
      printBanner();
      const outstanding = calculateOutstanding(invoice);
      recordDueDate(invoice);
      printDetails(invoice, outstanding);
    }
  
    function printBanner() {
      console.log('********************');
      console.log('**** 고객 채무 ****');
      console.log('********************');
    }
  
    function calculateoutstanding(invoice) {
      let result = 0;
      for(const o of invoice) {
        result += o.amount;
      }
      return result;
    }
  
    function recordDueDate(invoice) {
      const today = Clock.today;
      invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    }
    
    function printDetails(invoice, outstanding) {
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
    }
    </code>
  </pre>

- 변수 추출하기
- 함수 인라인하기
- 변수 인라인하기
- 함수 선언 바꾸기
- 변수 이름 바꾸기
- 변수 캡슐화하기
- 매개변수 객체 만들기
- 여러 함수를 클래스로 묶기
- 단계 쪼개기
