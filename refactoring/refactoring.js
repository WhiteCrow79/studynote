function statement(invoices, plays) {
    
    const invoice = invoices[0];
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
        minimumFractionDigits: 2
    }).format;

    for(let perf of invoice.performances) {
        
        // 포인트를 적립한다.
        volumeCredits += Math.max(perf.audience - 30, 0);
        // 희극 관객 5명마다 추가 포인트를 제공한다.
        if('comedy' === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        
        // 청구 내역을 출력한다.
        result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
        totalAmount += amountFor(perf);
    }

    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
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

const invoices = 
[{
    "customer": "BigCo",
    "performances": [
        {
        "playID": "hamlet",
        "audience": 55
        },
        {
        "playID": "as-like",
        "audience": 35
        },
        {
        "playID": "othello",
        "audience": 40
        }
    ]
}];

const plays = 
{
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As you Like it", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};

console.log(statement(invoices, plays));