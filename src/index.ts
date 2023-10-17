import { plays } from "./plays";
import { statement } from "./statement";

const result = statement(
  {
    customer: "IMG Arena",
    performances: [
      {
        audience: 30,
        playID: "as-like",
      },
    ],
  },
  plays
);

console.log(result);
