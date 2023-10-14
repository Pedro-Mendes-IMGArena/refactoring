
type Performance = {
    audience: number,
    playID: string
}

type Invoice = {
    customer: string;
    performances: Array<Performance>
}

type Play = {
    type: string;
    name: string;
}

type PlaysMap = Record<string, Play>;

export function statement(invoice: Invoice, plays: PlaysMap) {
    let result = `Statement for ${invoice.customer}\n`;
    
    const accumulatedPerformanceStatement = printPerformanceStatement(invoice, plays);
    result += accumulatedPerformanceStatement;
    result += `Amount owed is ${formatMoney(calculateTotalAmountOwed(invoice.performances, plays) / 100)}\n`;
    result += `You earned ${calculateVolumeCredits(invoice.performances, plays)} credits\n`;
    return result;
}

function printPerformanceStatement(invoice: Invoice, plays: PlaysMap) {
    let accumulatedPerformanceStatement = '';
    for (let perf of invoice.performances) {
        const play: Play = plays[perf.playID];
        // print line for this order
        accumulatedPerformanceStatement += ` ${play.name}: ${formatMoney(calculateAmountOwedBy(play.type, perf.audience) / 100)} (${perf.audience} seats)\n`;
    }
    return accumulatedPerformanceStatement;
}

function calculateVolumeCredits(performances: Invoice['performances'], plays: PlaysMap) {
    let result = 0;
    for (let perf of performances) {
        const play: Play = plays[perf.playID];
        // add volume credits
        result += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) result += Math.floor(perf.audience / 5);
    }
    return result;
}

function calculateTotalAmountOwed(performances: Invoice['performances'], plays: PlaysMap) {
    let result = 0;
    for (let perf of performances) {
        const play: Play = plays[perf.playID];
        result += calculateAmountOwedBy(play.type, perf.audience);
    }
    return result;
}

 function calculateAmountOwedBy(playType: Play['type'], audience: Performance['audience']) {
    let result = 0;
    switch (playType) {
        case "tragedy":
            result = 40000;
            if (audience > 30) {
                result += 1000 * (audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (audience > 20) {
                result += 10000 + 500 * (audience - 20);
            }
            result += 300 * audience;
            break;
        default:
            throw new Error(`unknown type: ${playType}`);
    }
    return result;
 }
    
 function formatMoney(money: number) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(money);
}