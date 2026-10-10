import React, { useEffect, useMemo, useState } from "react";
import { fetchTransactions } from "./api/transactionsApi";
import { calculateRewards } from "./utils/rewards";
import RewardsTable from "./components/RewardsTable";
import TransactionsTable from "./components/TransactionsTable";
import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchTransactions()
      .then((data) => !cancelled && setTransactions(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const { months, customers } = useMemo(
    () => calculateRewards(transactions),
    [transactions]
  );

  if (loading) return <p className="status">Loading transactions…</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", backgroundColor: "lightgray"}}>CUSTOMER REWARDS POINTS</h1>

      <h2>Points per Customer</h2>
      <RewardsTable months={months} customers={customers} />

      <h2>All Transactions</h2>
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default App;
