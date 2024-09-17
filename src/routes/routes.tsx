import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import Registration from "../pages/Registration";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NeedsPasswordChanges from "../pages/passwordChanges/NeedsPasswordChanges";

const router = createBrowserRouter([
  {
    index: true,
    element: <App></App>,
  },
  {
    path: "/home",
    element: <App></App>,
  },
  {
    path: "/admin",
    element:<ProtectedRoute role='admin'><App></App></ProtectedRoute> ,
    children: routesGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element:<ProtectedRoute role='faculty'><App></App></ProtectedRoute>,
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <ProtectedRoute role='student'><App></App></ProtectedRoute>,
    children: routesGenerator(studentPaths),
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/needs-password-changes",
    element:<NeedsPasswordChanges></NeedsPasswordChanges>,
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
]);
export default router;
