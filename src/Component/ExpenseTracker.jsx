import React, { useState } from "react";
import Product from "./Product";
import "./style.css";
import inputField from "./InputFields";

const ExpenseTracker = () => {
  const [input, setInput] = useState({ name: "", date: "", amount: "" });
  const [forData, setFormData] = useState([]);
  const [isEdit, setEdit] = useState(null);
  const [search, setSearch] = useState("");
  const handleChaneg = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (
      input.name.trim() !== "" &&
      input.date.trim() !== "" &&
      input.amount.trim() !== ""
    ) {
      if (isEdit !== null) {
        // is true
        const updateditem = forData.map((value, index) =>
          index == isEdit ? input : value
        );
        setFormData(updateditem);
        setEdit(null);
        setInput({ name: "", date: "", amount: "" });
      } else {
        setFormData((prev) => [...prev, input]);
        setInput({ name: "", date: "", amount: "" });
      }
    }
  };

  const handleEdit = (index) => {
    setEdit(index);
    setInput(forData[index]);
  };
  const handleDelete = (index) => {
    setFormData(forData.filter((_, id) => id !== index));
  };
  const total = forData.reduce((acc, value) => acc + parseInt(value.amount), 0);
  console.log(
    "input",
    forData.reduce((acc, value) => acc + parseInt(value.amount), 0)
  );
  const filterdata = () => {
    return forData.filter(
      (value, _) =>
        value.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        value.date.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        value.amount.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };
  return (
    <div className="main-container">
      <h1 className="expense-track">Expense Tracker</h1>

      <div className="item-container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <input
            className="inputfields"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search item......"
          />
          <input
            className="inputfields"
            type="date"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by date......"
          />
        </div>

        <div className="container">
          {inputField.map((value, index) => (
            <div
              key={index}
              style={{ padding: "2px" }}
              className="itemcontainer"
            >
              <label>{value.label}</label>
              <input
                className="inputfields"
                type={value.type}
                placeholder={value.placeholder}
                name={value.name}
                onChange={(e) => handleChaneg(e)}
                value={input[value.name]}
              />
            </div>
          ))}
          <button onClick={() => handleAdd()} className="save-updatebutton">
            {isEdit !== null ? "Update" : "Add"}
          </button>
        </div>
        <br></br>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterdata().length == 0 && search.length ? (
                <div style={{ padding: "20px" }}>No data found...</div>
              ) : (
                filterdata().map((value, index) => (
                  <>
                    <Product
                      value={value}
                      index={index}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      total={total}
                    />
                  </>
                ))
              )}
            </tbody>
            <tr>
              <td colSpan="3">Total:</td>
              <td style={{ fontWeight: "bold" }}>Rs. {total}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
