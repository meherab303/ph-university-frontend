import { Layout, Menu } from "antd";
import { sideBarGenerator } from "../../utils/sidebarGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;
const userRole = {
  ADMIN: "admin",
  STUDENT: "student",
  FACULTY: "faculty",
};

const Sidebar = () => {
  const user = useAppSelector(currentUser);
  let sidebarItems;
  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sideBarGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sideBarGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sideBarGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",

          textAlign: "center",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>PH UNI</p>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
