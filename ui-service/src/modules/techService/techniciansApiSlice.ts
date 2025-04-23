/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TECH_SERVICE_PATH } from "src/config";
import type { Technician } from "src/types/Technician";

type GetTechnicianParams = {
  id: string;
};

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
  }),
});

export const { useGetTechniciansQuery, useGetTechnicianQuery } =
  techniciansApiSlice;
