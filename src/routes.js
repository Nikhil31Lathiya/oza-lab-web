import { createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
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
import AddUser from "./pages/User/AddUser";
import ViewUser from "./pages/User/ViewUser";
import JsonEditor from "./components/JSONInput";
import EditUser from "./pages/User/EditUser";
import AddExistingPatient from "./pages/Patient/ExistingPatient";
import EditReports from "./pages/Report/EditReport";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import AddHomeVisit from "./pages/HomeVisit/AddHomeVisit";
import ViewHomeVisits from "./pages/HomeVisit/ViewHomeVisit";
import ViewApprovedHomeVisits from "./pages/HomeVisit/ViewApprovedHomeVisit";

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
    path: "/user/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/jsonInput",
    element: <JsonEditor data={[]} />,
  },
  {
    path: "/user/addUser",
    element: <AddUser />
  },
  {
    path: "/user/viewUser",
    element: <ViewUser />
  },
  {
    path: "/user/viewUser/edit",
    element: <EditUser />
  },
  {
    path: "/patient/addPatient",
    element: <AddPatient />,
  },
  {
    path: "/patient/addPatient/existingUser",
    element: <AddExistingPatient />,
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
  },
  {
    path: "/reports/viewReport/edit",
    element: <EditReports />,
  },
  {
    path: "/homeVisit/add",
    element: <AddHomeVisit />,
  },
  {
    path: "/homeVisit/pending",
    element: <ViewHomeVisits />,
  },
  {
    path: "/homeVisit/approved",
    element: <ViewApprovedHomeVisits />,
  }

]);

export default router;
