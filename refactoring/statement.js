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

function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {

    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
    for(let perf of data.performances) {
        result += 
            `<tr>
                <td>${perf.play.name}</td>
                <td>${perf.audience}</td>
                <td>${usd(perf.amount)}</td>
            </tr>\n`;
    }
    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}점</em></p>\n`;

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

console.log(htmlStatement(invoice, plays));