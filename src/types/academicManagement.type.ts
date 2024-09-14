export type TAcademicSemester = {
  code: string;
  createdAt: string;
  endMonth: string;
  name: string;
  startMonth: string;
  updatedAt: string;
  year: string;
  _id: string;
};
export type TAcademicSemesterTableData = {
  code: string;
  endMonth: string;
  name: string;
  startMonth: string;
  year: string;
  key: string;
};
export type TAcademicFaculty = {
  name: string;
  _id: string;
};

export type TAcademicFacultyTableData = {
  name: string;
  key: string;
};
export type TAcademicDepartment = {
  name: string;
  academicFaculty: TAcademicFaculty;
  _id: string;
};
export type TAcademicDepartmentTableData = {
  name: string;
  academicFaculty: string;
  key: string;
};
