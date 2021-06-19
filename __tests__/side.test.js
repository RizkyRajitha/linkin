const { isEmpty } = require("../lib/side");

describe("isEmpty ", () => {
  it(" '' is true", () => {
    expect(isEmpty("")).toBe(true);
  });
  it(" false isEmpty true", () => {
    expect(isEmpty(false)).toBe(true);
  });
  it(" null isEmpty true", () => {
    expect(isEmpty(null)).toBe(true);
  });
  it(" undefined isEmpty true", () => {
    expect(isEmpty(undefined)).toBe(true);
  });
});
