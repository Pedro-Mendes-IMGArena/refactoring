import { Play, Invoice } from "./types";
import {
    formatMoney,
    calculateTotalAmountOwed,
    calculateVolumeCredits,
    calculateAmountOwedBy
} from "./statementUtils";

export type PlaysMap = Record<string, Play>;

export function statementText(invoice: Invoice, plays: PlaysMap) {
    let result = `Statement for ${invoice.customer}\n`;
    result += createStatementDescription(invoice.performances, plays);
    result += `Amount owed is ${formatMoney(calculateTotalAmountOwed(invoice.performances, plays) / 100)}\n`;
    result += `You earned ${calculateVolumeCredits(invoice.performances, plays)} credits\n`;
    return result;
}

function createStatementDescription(performances: Invoice['performances'], plays: PlaysMap) {
    let result = '';
    for (let perf of performances) {
        const play: Play = plays[perf.playID];
        // print line for this order
        result += ` ${play.name}: ${formatMoney(calculateAmountOwedBy(play.type, perf.audience) / 100)} (${perf.audience} seats)\n`;
    }
    return result;
}

