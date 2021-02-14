function statement(invoice, plays) {

    return renderPlayText(createStatementData(invoice, plays));
    
}

function renderPlayText(data, invoice, plays) {
    
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    
    for(let perf of data.performances) {
        
        // 청구 내역을 출력한다.
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
        
    }
    
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
    return result;

}

function usd(aNumber) {

    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
        minimumFractionDigits: 2
    }).format(aNumber/100);

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

const invoice = invoices[0];

console.log(statement(invoice, plays));