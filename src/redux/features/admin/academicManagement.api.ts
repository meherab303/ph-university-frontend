import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.type";
import { TResponse } from "../../../types/global.type";
import { baseApi } from "../../api/baseApi";

const academicManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach(({ name, value }: { name: string; value: string }) =>
            params.append(name, value)
          );
        }
        return {
          url: "/academic-semester",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponse<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "academic-semester/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "academic-faculty/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculty: builder.query({
      query: () => {
        return {
          url: "/academic-faculty",
          method: "GET",
        };
      },
      transformResponse: (response: TResponse<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "academic-department/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    getAllDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.forEach(({ name, value }: { name: string; value: string }) =>
          params.append(name, value)
        );
        return {
          url: "/academic-department",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponse<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});
export const {
  useGetAllSemesterQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllFacultyQuery,
  useGetAllDepartmentQuery,
  useAddAcademicDepartmentMutation,
} = academicManagement;
