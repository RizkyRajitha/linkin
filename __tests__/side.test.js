const { isEmpty, isHex } = require("../lib/side");

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
  it(" other value is false", () => {
    expect(isEmpty("value")).toBe(false);
  });
});

describe("isHex ", () => {
  it(" empty is false", () => {
    expect(isHex("")).toBe(false);
  });
  it(" null is false", () => {
    expect(isHex(null)).toBe(false);
  });
  it(" undefined is false", () => {
    expect(isHex(undefined)).toBe(false);
  });
  it(" 3 digit hex is true", () => {
    expect(isHex("#000")).toBe(true);
  });
  it(" 3 digit non hex is false", () => {
    expect(isHex("#0L0")).toBe(false);
  });
  it(" 6 digit hex is true", () => {
    expect(isHex("#000000")).toBe(true);
  });
  it(" 6 digit non hex is false", () => {
    expect(isHex("#000HHL")).toBe(false);
  });
});
