import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, JOB_SERVICE_PATH } from "src/config";
import type { Job } from "src/types/Job";

type GetJobParams = {
  id: string;
};
type UpdateJobPayload = Pick<
  Job,
  "id" | "state" | "technicianId" | "dispatchId"
>;

export const jobsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "jobsApi",
  tagTypes: ["Jobs"],
  endpoints: (build) => ({
    getJobs: build.query<Job[], void>({
      query: () => JOB_SERVICE_PATH,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Jobs" as const,
                id,
              })),
              { type: "Jobs", id: "LIST" },
            ]
          : [{ type: "Jobs", id: "LIST" }],
    }),
    getJob: build.query<Job, GetJobParams>({
      query: ({ id }) => `${JOB_SERVICE_PATH}/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: "Jobs", id }],
    }),
    updateJob: build.mutation<Omit<UpdateJobPayload, "id">, UpdateJobPayload>({
      query: ({ id, ...body }) => ({
        url: `${JOB_SERVICE_PATH}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Jobs", id },
        { type: "Jobs", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetJobsQuery, useGetJobQuery, useUpdateJobMutation } =
  jobsApiSlice;
