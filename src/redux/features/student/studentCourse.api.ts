import { TResponse } from "../../../types/global.type";
import { TTStudentOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi=baseApi.injectEndpoints({ endpoints: (builder) => ({
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolledCourse/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['offeredCourse']
    }),
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
      providesTags:['offeredCourse'],
      transformResponse: (response: TResponse<TTStudentOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),})
export const{useGetAllOfferedCoursesQuery,useEnrollCourseMutation} =studentCourseApi