// import React from "react";
// import { calculatePoints } from "../utils/rewards";

// const TransactionsTable = ({ transactions }) => (
//   <table>
//     <thead>
//       <tr>
//         <th>ID</th>
//         <th>Customer</th>
//         <th>Date</th>
//         <th>Amount</th>
//         <th>Points</th>
//       </tr>
//     </thead>
    
//     <tbody>
//       {transactions.map((t) => (
//         <tr key={t.id}>
//           <td>{t.id}</td>
//           <td>{t.customerName}</td>
//           <td>{t.date}</td>
//           <td>${t.amount.toFixed(2)}</td>
//           <td>{calculatePoints(t.amount)}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// );

// export default TransactionsTable;

import React, { useState, useMemo } from "react";
import { calculatePoints } from "../utils/rewards";

const initialFilters = {
  customerName: "",
  date: "",
  amount: "",
  points: "",
};

const TransactionsTable = ({ transactions }) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredTransactions = useMemo(() => {
    const matches = (cellValue, filterValue) =>
      String(cellValue).toLowerCase().includes(filterValue.trim().toLowerCase());

    return transactions.filter(
      (t) =>
        matches(t.customerName, filters.customerName) &&
        matches(t.date, filters.date) &&
        matches(t.amount.toFixed(2), filters.amount) &&
        matches(calculatePoints(t.amount), filters.points)
    );
  }, [transactions, filters]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Points</th>
        </tr>
        <tr>
            <th></th>
          {Object.keys(initialFilters).map((key) => (
            <th key={key}>
              <input
                type="text"
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                placeholder="Filter..."
                style={{ width: "100%", boxSizing: "border-box" }}
              />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.customerName}</td>
              <td>{t.date}</td>
              <td>${t.amount.toFixed(2)}</td>
              <td>{calculatePoints(t.amount)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No matching transactions</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
