import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import RegistrationForm from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/Patient/AddPatient";
import EditPatient from "./pages/Patient/EditPatient";
import ViewPatient from "./pages/Patient/ViewPatient";
import AddTest from "./pages/Test/AddTest";
import EditTest from "./pages/Test/EditTest";
import ViewTest from "./pages/Test/ViewTest";
import CreateReport from "./pages/Report/CreateReport";
import ViewReports from "./pages/Report/ViewReports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <RegistrationForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/patient/addPatient",
    element: <AddPatient />,
  },
  {
    path: "/patient/viewPatient",
    element: <ViewPatient />,
  },
  {
    path: "/patient/viewPatient/edit",
    element: <EditPatient />,
  },
  {
    path: "/test/addTest",
    element: <AddTest />,
  },
  {
    path: "/test/viewTest",
    element: <ViewTest />,
  },
  {
    path: "/test/viewTest/edit",
    element: <EditTest />,
  },
  {
    path: "/reports/AddReport",
    element: <CreateReport />,
  },
  {
    path: "/reports/ViewReport",
    element: <ViewReports />,
  }
]);

export default router;
