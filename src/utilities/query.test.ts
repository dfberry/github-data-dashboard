import { intersectionOfGoodAndBadRepos } from "./query";
import { a, b, abresult, c, d, e } from "../../data/intersection";

describe("query", () => {
  test("intersection both", () => {
    const venn: string[] = intersectionOfGoodAndBadRepos(a, b);
    expect(venn.length).toEqual(abresult.length);
    expect(venn).toEqual(abresult);
  });
  test("intersection both 2", () => {
    const venn: string[] = intersectionOfGoodAndBadRepos(c, d);
    expect(venn.length).toEqual(e.length);
    expect(venn).toEqual(e);
  });
});
