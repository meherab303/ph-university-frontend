import FacultyDashBoard from "../pages/faculty/FacultyDashBoard";
import FacultyOfferedCourse from "../pages/faculty/FacultyOfferedCourse";

export const facultyPaths = [
  {
    name: "dashBoard",
    path: "dashBoard",
    element: <FacultyDashBoard></FacultyDashBoard>,
  },
  {
    name: "offered-course",
    path: "offered-course",
    element: <FacultyOfferedCourse></FacultyOfferedCourse>,
  },
];
