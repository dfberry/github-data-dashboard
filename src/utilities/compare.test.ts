import { compareASC, compareDESC } from "./compare";
import data from "../../data/summary.json";

describe("compare", () => {
  test("asc", () => {
    const oldest = data.sort(compareASC)[0];
    console.log(oldest);
    expect(oldest).toStrictEqual({ date: "2022-12-10", count: 2110 });
  });
  test("desc", () => {
    const newest = data.sort(compareDESC)[0];
    console.log(newest);
    expect(newest).toStrictEqual({ date: "2023-01-31", count: 2131 });
  });
});
