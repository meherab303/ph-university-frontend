import { TSemesterRegistration } from "../../../types/courseManagement.type";
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
      
    
  }),
  
});

export const {useAddSemsterRegistrationMutation,useGetAllRegisteredSemisterQuery,useUpdateSemsterRegistrationMutation}=courseManagement