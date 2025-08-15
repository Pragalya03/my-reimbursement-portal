// src/components/TableView.jsx
import React from "react";

const TableView = ({ columns, data, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
              No data available
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col}>{row[col] ?? ""}</td>
              ))}
              <td>
                <button onClick={() => onEdit(row)}>Edit</button>
                <button onClick={() => onDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};



export default TableView;
