import React from 'react';

const Tablerow = ({ value, count, averageAge }) => {
  return (
    <tr>
      <td>{value.toUpperCase()}</td>
      <td>{count}</td>
      <td>{averageAge.toFixed(2)}</td>
    </tr>
  );
};

export default Tablerow;