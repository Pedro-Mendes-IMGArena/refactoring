import { PlaysMap } from "./statement";
import { Invoice, Play, Performance } from "./types";


export function calculateVolumeCredits(performances: Invoice['performances'], plays: PlaysMap) {
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
export function calculateTotalAmountOwed(performances: Invoice['performances'], plays: PlaysMap) {
    let result = 0;
    for (let perf of performances) {
        const play: Play = plays[perf.playID];
        result += calculateAmountOwedBy(play.type, perf.audience);
    }
    return result;
}
export function calculateAmountOwedBy(playType: Play['type'], audience: Performance['audience']) {
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
export function formatMoney(money: number) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(money);
}
