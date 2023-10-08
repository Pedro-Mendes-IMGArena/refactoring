import { statement } from "./statement";

const result = statement({
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

console.log(result);