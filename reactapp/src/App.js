import React from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ExpenseForm onExpenseAdded={() => {}} />
      <ExpenseList />
    </div>
  );
}

export default App;
