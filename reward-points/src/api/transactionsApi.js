import transactions from "../data/transactions";

// Simulates a network call. Pass shouldFail=true to test the error state.
export const fetchTransactions = (shouldFail = false, delay = 1200) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch transactions."));
      } else {
        resolve(transactions);
      }
    }, delay);
  });
  