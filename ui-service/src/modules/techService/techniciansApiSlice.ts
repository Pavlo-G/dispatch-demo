import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TECH_SERVICE_PATH } from "src/config";
import type { Technician } from "src/types/Technician";

type GetTechnicianParams = {
  id: string;
};
type UpdateTechnicianPayload = Partial<Technician> & Pick<Technician, "id">;
type DeleteTechnicianParams = GetTechnicianParams;

export const techniciansApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "techniciansApi",
  tagTypes: ["Technicians"],
  endpoints: (build) => ({
    getTechnicians: build.query<Technician[], void>({
      query: () => TECH_SERVICE_PATH,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Technicians" as const,
                id,
              })),
              { type: "Technicians", id: "LIST" },
            ]
          : [{ type: "Technicians", id: "LIST" }],
    }),
    getTechnician: build.query<Technician, GetTechnicianParams>({
      query: ({ id }) => `${TECH_SERVICE_PATH}/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: "Technicians", id }],
    }),
    updateTechnician: build.mutation<
      Omit<UpdateTechnicianPayload, "id">,
      UpdateTechnicianPayload
    >({
      query: ({ id, ...body }) => ({
        url: `${TECH_SERVICE_PATH}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Technicians", id },
        { type: "Technicians", id: "LIST" },
      ],
    }),
    deleteTechnician: build.mutation<void, DeleteTechnicianParams>({
      query: ({ id }) => ({
        url: `${TECH_SERVICE_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Technicians", id },
        { type: "Technicians", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTechniciansQuery,
  useGetTechnicianQuery,
  useUpdateTechnicianMutation,
  useDeleteTechnicianMutation,
} = techniciansApiSlice;
