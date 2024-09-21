import { TResponse } from "../../../types/global.type";



import { baseApi } from "../../api/baseApi";

const facultyCourseApi=baseApi.injectEndpoints({ endpoints: (builder) => ({
    updateCourseCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolledCourse/update-enrolled-course-marks",
        method: "PATCH",
        body: data,
      }),
      
    }),
   
    getFacultyEnrolledCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach(({ name, value }: { name: string; value: string }) =>
            params.append(name, value)
          );
        }
        return {
          url:"/enrolledCourse",
          method: "GET",
          params,
        };
      },
      
      transformResponse: (response: TResponse<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),})
export const{useGetFacultyEnrolledCourseQuery,useUpdateCourseCourseMutation} =facultyCourseApi