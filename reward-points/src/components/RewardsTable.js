import { formatMonth } from "../utils/rewards";

const RewardsTable = ({ months, customers }) => (
  <table>
    <thead>
      <tr>
        <th>Customer</th>
        {months.map((m) => (
          <th key={m}>{formatMonth(m)}</th>
        ))}
        <th>Total Points</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((c) => (
        <tr key={c.id}>
          <td>{c.name}</td>
          {months.map((m) => (
            <td key={m}>{c.monthly[m] || 0}</td>
          ))}
          <td className="total">{c.total}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default RewardsTable;
