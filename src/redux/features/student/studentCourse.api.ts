import { TResponse } from "../../../types/global.type";
import { TTStudentOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi=baseApi.injectEndpoints({ endpoints: (builder) => ({
    // addStudent: builder.mutation({
    //   query: (data) => ({
    //     url: "users/create-student",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // passWordChange: builder.mutation({
    //   query: (data) => ({
    //     url:"/auth/change-password",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach(({ name, value }: { name: string; value: string }) =>
            params.append(name, value)
          );
        }
        return {
          url:"/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponse<TTStudentOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),})
export const{useGetAllOfferedCoursesQuery} =studentCourseApi