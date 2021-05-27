const { isEmptry } = require("../lib/side");

describe("isEmptry ", () => {
  it(" '' is true", () => {
    expect(isEmptry("")).toBe(true);
  });
  it(" false isEmptry true", () => {
    expect(isEmptry(false)).toBe(true);
  });
  it(" null isEmptry true", () => {
    expect(isEmptry(null)).toBe(true);
  });
  it(" undefined isEmptry true", () => {
    expect(isEmptry(undefined)).toBe(true);
  });
});
