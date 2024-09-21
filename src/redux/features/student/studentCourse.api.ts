import { TResponse } from "../../../types/global.type";
import { TMyEnrolledCourse } from "../../../types/MyEnrolledCourse.type";
import { TMyOffereCourse } from "../../../types/Student.MyOfferedCourse.type";

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
      transformResponse: (response: TResponse<TMyOffereCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getMyEnrolledCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach(({ name, value }: { name: string; value: string }) =>
            params.append(name, value)
          );
        }
        return {
          url:"/enrolledCourse/my-enrolled-courses",
          method: "GET",
          params,
        };
      },
      
      transformResponse: (response: TResponse<TMyEnrolledCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),})
export const{useGetAllOfferedCoursesQuery,useEnrollCourseMutation,useGetMyEnrolledCourseQuery} =studentCourseApi