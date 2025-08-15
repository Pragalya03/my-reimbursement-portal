/*import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="full-width-navbar">
        <NavLink to="/employee" className="user-type-btn">
          Employee
        </NavLink>
        <NavLink to="/manager" className="user-type-btn">
          Manager
        </NavLink>
      </nav>

      <div className="App">
        <Routes>
          <Route
             path="/"
                element={
                    <div className="page-container">
                        <ExpenseForm />
                    </div>
              }
          />
          <Route
             path="/employee"
                element={
                    <div className="page-container">
                        <ExpenseForm />
                    </div>
              }
          />

          <Route path="/manager" element={<ExpenseList />} />
          <Route path="/expenses/:id/update" element={<ExpenseStatusUpdate />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
*/import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { appRoutes } from "./routes";
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser } from "./utils/auth";
import './App.css';

function App() {
  const currentUser = getCurrentUser();

  return (
    <Router>
      <nav className="full-width-navbar">
        <NavLink to="/employee" className="user-type-btn">Employee</NavLink>
        <NavLink to="/manager" className="user-type-btn">Manager</NavLink>
        <NavLink to="/finance" className="user-type-btn">Finance</NavLink>
        <NavLink to="/admin" className="user-type-btn">Admin</NavLink>
      </nav>

      <div className="App">
        <Routes>
          {appRoutes.map((route, idx) => {
            const Element = route.element;
            if (route.roles) {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <ProtectedRoute
                      element={Element}
                      allowedRoles={route.roles}
                      currentUser={currentUser}
                    />
                  }
                />
              );
            } else {
              return <Route key={idx} path={route.path} element={<Element />} />;
            }
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
