export const adminPaths2 = [
  {
    name: "dashboard",
    path: "dashboard",
    element: "ADMIN_DASHBOARD",
  },
  {
    name: "userManagement",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CREATE_ADMIN",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CREATE_FACULTY",
      },
      {
        name: "Create Admin",
        path: "create-student",
        element: "CREATE_STUDENT",
      },
    ],
  },
];

const adminSideBar = adminPaths2.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: "NAVLINK",
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: "NAVLINK",
      })),
    });
  }

  return acc;
}, []);
console.log(JSON.stringify(array));
// const array = adminPaths2.reduce((acc, item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
// //   return acc;
// }, []);
