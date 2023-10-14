
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

export function statement(invoice: Invoice, plays: Record<string,Play>) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",

        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;

    for (let perf of invoice.performances) {
        const play: Play = plays[perf.playID];
        let thisAmount = calculateAmountOwedBy(play.type, perf);
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;

    function calculateAmountOwedBy(playType: Play['type'], audience: Performance['audience']) {
        let thisAmount = 0;
        switch (playType) {
            case "tragedy":
                thisAmount = 40000;
                if (audience > 30) {
                    thisAmount += 1000 * (audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (audience > 20) {
                    thisAmount += 10000 + 500 * (audience - 20);
                }
                thisAmount += 300 * audience;
                break;
            default:
                throw new Error(`unknown type: ${playType}`);
        }
        return thisAmount;
    }
}