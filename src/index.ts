import { statementText } from "./statement";

const result = statementText({
    customer: "Customer Names goes here", performances: [{
        audience: 30,
        playID: "comedy"
    }]
}, {
    comedy: {
        name: "the comedy show",
        type: "comedy"
    }
});