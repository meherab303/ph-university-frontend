import StudentDashBoard from "../pages/student/StudentDashBoard";
import StudentOfferedCourse from "../pages/student/StudentOfferedCourse";

export const studentPaths = [
  {
    name: "dashBoard",
    path: "dashBoard",
    element: <StudentDashBoard></StudentDashBoard>,
  },
  {
    name: "offered-course",
    path: "offered-course",
    element: <StudentOfferedCourse></StudentOfferedCourse>,
  },
];
