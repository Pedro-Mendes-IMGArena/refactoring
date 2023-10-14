
export type Performance = {
    audience: number;
    playID: string;
};

export type Invoice = {
    customer: string;
    performances: Array<Performance>;
};

export type Play = {
    type: string;
    name: string;
};
