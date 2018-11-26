import immutable from "immutable";

describe("immutable测试", () => {
  const immutableObject = immutable.Map({ meta: { totalCount: 0 } });
  test("getIn测试", () => {
    expect(immutableObject.getIn(["meta", "totalCount"])).toEqual(0);
  });
  test("setIn测试", () => {
    expect(
      immutableObject
        .setIn(["meta", "totalCount"], 4)
        .getIn(["meta", "totalCount"])
    ).toEqual(4);
  });
  test("更改之后引用发生变化", () => {
    const newImmutableObject = immutableObject.setIn(["meta", "totalCount"], 4);
    expect(newImmutableObject === immutableObject).toBeFalsy();
  });
});
