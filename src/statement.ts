
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
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;

    for (let perf of invoice.performances) {
        const play: Play = plays[perf.playID];
        // print line for this order
        result += ` ${play.name}: ${format(calculateAmountOwedBy(play.type, perf.audience) / 100)} (${perf.audience} seats)\n`;
    }
   
    volumeCredits = calculateVolumeCredits(invoice, plays, volumeCredits);
    

    result += `Amount owed is ${format(calculateTotalAmountOwed(invoice.performances, plays) / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

   
}

function calculateVolumeCredits(invoice: Invoice, plays: PlaysMap, volumeCredits: number) {
    for (let perf of invoice.performances) {
        const play: Play = plays[perf.playID];
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    }
    return volumeCredits;
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