import React from "react";
import "./style.css";

const Product = ({ value, index, handleDelete, handleEdit, total }) => {
  return (
    <>
      <tr key={index}>
        <td>{value.name}</td>
        <td>{value.date}</td>
        <td>{value.amount}</td>
        <td>
          <button onClick={() => handleEdit(index)}>Edit</button>&nbsp;
          <button onClick={() => handleDelete(index)}>Delete</button>
        </td>
      </tr>
    </>
  );
};

export default Product;
