// routes.js
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import EmployeeRegistration from "./pages/EmployeeRegistration";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import FinanceDashboard from "./pages/FinanceDashboard";
import AdminPanel from "./pages/AdminPanel";
import ReceiptManagement from "./pages/ReceiptManagement";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseStatusUpdate from "./components/ExpenseStatusUpdate";

export const appRoutes = [
  { path: "/", element: LandingPage },
  { path: "/login", element: LoginPage },
  { path: "/register", element: EmployeeRegistration },
  {
    path: "/employee",
    element: EmployeeDashboard,
    roles: ["EMPLOYEE"],
  },
  {
    path: "/manager",
    element: ManagerDashboard,
    roles: ["MANAGER"],
  },
  {
    path: "/finance",
    element: FinanceDashboard,
    roles: ["FINANCE_MANAGER"],
  },
  {
    path: "/admin",
    element: AdminPanel,
    roles: ["ADMIN"],
  },
  {
    path: "/receipts",
    element: ReceiptManagement,
    roles: ["EMPLOYEE", "MANAGER", "FINANCE_MANAGER"],
  },
  { path: "/expenses/new", element: ExpenseForm },
  { path: "/expenses", element: ExpenseList },
  { path: "/expenses/:id/update", element: ExpenseStatusUpdate },
];
