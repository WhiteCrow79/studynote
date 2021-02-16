## 기본적인 리팩토링

- 함수 추출하기
  <pre>
    <code>
    function printOwing(invoice) {
      printBanner();
      let outstanding = calculateOutstanding();
      
      //세부 사항 출력
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
    }
    </code>
  </pre>
  <pre>
    <code>
    function printOwing(invoice) {
      printBanner();
      let outstanding = calculateOutstanding();
      printDetails(outstanding);
  
      function printDetails(outstanding) {
        console.log(`고객명: ${invoice.customer}`);
        console.log(`채무액: ${outstanding}`);
      }
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
