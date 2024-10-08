import { TCourses, TSemesterRegistration } from "../../../types/courseManagement.type";
import { TResponse } from "../../../types/global.type";

import { baseApi } from "../../api/baseApi";

const courseManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemsterRegistration:builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags:['semesterRegistration']
    }),
    getAllRegisteredSemister:builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args?.forEach(({ name, value }: { name: string; value: string }) =>
            params.append(name, value)
          );
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponse<TSemesterRegistration[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags:['semesterRegistration']
      
    }),
    updateSemsterRegistration:builder.mutation({
        query: (args) => ({
          url:`/semester-registrations/${args?.semesterId}`,
          method: "PATCH",
          body: args.data,
        }),
        invalidatesTags:['semesterRegistration']
      }),
      addCourses:builder.mutation({
        query: (data) => ({
          url: "/courses/create-course",
          method: "POST",
          body: data,
        }),
        invalidatesTags:['courses']
      }),
      getAllCourses:builder.query({
        query: (args) => {
          const params = new URLSearchParams();
          if (args) {
            args?.forEach(({ name, value }: { name: string; value: string }) =>
              params.append(name, value)
            );
          }
          return {
            url: "/courses",
            method: "GET",
            params,
          };
        },
        transformResponse: (response: TResponse<TCourses[]>) => {
          return {
            data: response.data,
            meta: response.meta,
          };
        },
        providesTags:['courses'] 
      }),
      
    
      assignFaculties:builder.mutation({
        query: (args) => ({
          url:`/courses/${args.courseId}/assign-faculties`,
          method: "PUT",
          body:args.facultiesId,
        }),
        invalidatesTags:["assignFaculties"]
      }),
      getAllAsignFacultiesWithCourse:builder.query({
        query: (id) => {
          return {
            url:`/courses/${id}/get-faculties`,
            method:"GET",
          };
        },
        transformResponse: (response: TResponse<any[]>) => {
          return {
            data: response.data,
          };
        },
        providesTags:['assignFaculties']
        
      }),
      addOfferCourses:builder.mutation({
        query: (data) => ({
          url: "/offered-courses/create-offered-course",
          method: "POST",
          body: data,
        }),
        // invalidatesTags:['courses']
      }),
    
  }),
  
});

export const {useAddSemsterRegistrationMutation,useGetAllRegisteredSemisterQuery,useUpdateSemsterRegistrationMutation,useGetAllCoursesQuery,useAddCoursesMutation,useAssignFacultiesMutation,useGetAllAsignFacultiesWithCourseQuery,useAddOfferCoursesMutation}=courseManagement