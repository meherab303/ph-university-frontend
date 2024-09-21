import FacultyDashBoard from "../pages/faculty/FacultyDashBoard";
import FacultyEnrolledCourse from "../pages/faculty/FacultyEnrolledCourse";
import MyStudents from "../pages/faculty/MyStudents";



export const facultyPaths = [
  {
    name: "dashBoard",
    path: "dashBoard",
    element: <FacultyDashBoard></FacultyDashBoard>,
  },
  {
    name: "My Courses",
    path: "my-courses",
    element: <FacultyEnrolledCourse></FacultyEnrolledCourse>,
  },
  {
    path: "/faculty/courses/:semesterRegistrationId/:courseId",
    element:<MyStudents></MyStudents>,
  },
];
