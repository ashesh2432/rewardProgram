import { calculatePoints, calculateRewards } from "./rewards";

describe("calculatePoints", () => {
  test.each([
    [0, 0],
    [49.99, 0],
    [50, 0],
    [51, 1],
    [75, 25],
    [100, 50],
    [101, 52],
    [120, 90],
    [130, 110],
  ])("$%s -> %s points", (amount, expected) => {
    expect(calculatePoints(amount)).toBe(expected);
  });
});

describe("calculateRewards", () => {
  test("aggregates per customer per month and total", () => {
    const data = [
      { customerId: "A", customerName: "A", date: "2026-07-01", amount: 120 },
      { customerId: "A", customerName: "A", date: "2026-07-15", amount: 75 },
      { customerId: "A", customerName: "A", date: "2026-08-01", amount: 200 },
    ];
    const { months, customers } = calculateRewards(data);
    expect(months).toEqual(["2026-07", "2026-08"]);
    expect(customers[0].monthly["2026-07"]).toBe(115);
    expect(customers[0].monthly["2026-08"]).toBe(250);
    expect(customers[0].total).toBe(365);
  });
});
