export const calculatePoints = (amount) => {
  const dollars = Math.floor(Number(amount) || 0);
  let points = 0;

  if (dollars > 100) points += 2 * (dollars - 100); // 2x over $100
  if (dollars > 50) points += Math.min(dollars, 100) - 50; // 1x from $50–$100

  return points;
};

// "2026-07-03" -> "2026-07" (string split avoids timezone bugs)
export const getMonthKey = (dateStr) => dateStr.slice(0, 7);

export const formatMonth = (monthKey) => {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
};

// Returns { months: ["2026-07", ...], customers: [{ id, name, monthly: {key: pts}, total }] }
export const calculateRewards = (transactions) => {
  const monthSet = new Set();
  const customerMap = {};

  transactions.forEach(({ customerId, customerName, date, amount }) => {
    const monthKey = getMonthKey(date);
    const points = calculatePoints(amount);
    monthSet.add(monthKey);

    if (!customerMap[customerId]) {
      customerMap[customerId] = { id: customerId, name: customerName, monthly: {}, total: 0 };
    }
    const customer = customerMap[customerId];
    customer.monthly[monthKey] = (customer.monthly[monthKey] || 0) + points;
    customer.total += points;
  });

  return {
    months: [...monthSet].sort(),
    customers: Object.values(customerMap),
  };
};
