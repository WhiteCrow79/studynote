class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
}

function createStatementData(invoice, plays) {

  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;

  }

  function totalAmount(data) {
      
      return data.performances.reduce((total, p) => total + p.amount, 0);

  }

  function totalVolumeCredits(data) {
      
      return data.performances.reduce((total, p) => total + p.volumeCredits, 0);

  }

  function volumeCreditsFor(aPerformance) {

      let result = 0;
      // 포인트를 적립한다.
      result += Math.max(aPerformance.audience - 30, 0);
      // 희극 관객 5명마다 추가 포인트를 제공한다.
      if('comedy' === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
      return result;
      
  }

  function amountFor(aPerformance) {

      let result = 0;

      switch(playFor(aPerformance).type) {
          case 'tragedy':
              result = 40000;
              if(aPerformance.audience > 30) {
                  result += 1000 * (aPerformance.audience - 30);
              }
              break;
          case 'comedy':
              result = 30000;
              if(aPerformance.audience > 20) {
                  result += 10000 + 500 * (aPerformance.audience - 20);
              }
              result += 300 * aPerformance.audience;
              break;
          default:
              throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
      }

      return result;

  }

  function playFor(aPerformance) {
      return plays[aPerformance.playID];
  }

};