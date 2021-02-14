function statement(invoice, plays) {
    
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return renderPlayText(statementData, invoice, plays);
    
}

function enrichPerformance(aPerformance) {
    
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;

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

function totalAmount(data) {
    
    return data.performances.reduce((total, p) => total + p.amount, 0);

}

function totalVolumeCredits(data) {
    
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);

}


function usd(aNumber) {

    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD',
        minimumFractionDigits: 2
    }).format(aNumber/100);

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