import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please Select A Semester" }),
  year: z.string({ required_error: "Please Select A Year" }),
  startMonth: z.string({ required_error: "Please Select A startMonth" }),
  endMonth: z.string({ required_error: "Please Select A endMonth" }),
});
export const academicFaculty = z.object({
  name: z.string({ required_error: "please Select a Faculty" }),
});
export const academicDepartment = z.object({
  name: z.string({ required_error: "please Select a Department" }),
  academicFaculty: z.string({ required_error: "please Select a Faculty" }),
});
