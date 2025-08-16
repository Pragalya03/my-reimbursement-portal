import LandingPage from "./pages/Home";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import AdminPanel from "./pages/AdminPanel";
import ReceiptManagement from "./pages/ReceiptManagement";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";

export const appRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
  { path: "/employee", element: <EmployeeDashboard /> },
  { path: "/manager", element: <ManagerDashboard /> },
  { path: "/finance", element: <FinanceDashboard /> },
  { path: "/admin", element: <AdminPanel /> },
  { path: "/receipts", element: <ReceiptManagement /> },
  { path: "/expenses/new", element: <ExpenseForm /> },
  { path: "/expenses", element: <ExpenseList /> },
  { path: "/expenses/:id/update", element: <ExpenseStatusUpdate /> },
];
