import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, DISPATCH_SERVICE_PATH } from "src/config";
import type { Dispatch } from "src/types/Dispatch";
import type { Job } from "src/types/Job";

type GetDispatchParams = {
  id: string;
};
export type CreateDispatchPayload = Omit<Dispatch, "id" | "job"> & {
  job: Job;
};
type UpdateDispatchPayload = Pick<Dispatch, "id" | "appointmentDateTime">;
type DeleteDispatchParams = GetDispatchParams;

export const dispatchesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "dispatchesApi",
  tagTypes: ["Dispatches"],
  endpoints: (build) => ({
    getDispatches: build.query<Dispatch[], void>({
      query: () => DISPATCH_SERVICE_PATH,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Dispatches" as const,
                id,
              })),
              { type: "Dispatches", id: "LIST" },
            ]
          : [{ type: "Dispatches", id: "LIST" }],
    }),
    getDispatch: build.query<Dispatch, GetDispatchParams>({
      query: ({ id }) => `${DISPATCH_SERVICE_PATH}/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: "Dispatches", id }],
    }),
    createDispatch: build.mutation<Dispatch, CreateDispatchPayload>({
      query: (body) => ({
        url: DISPATCH_SERVICE_PATH,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Dispatches", id: "LIST" }],
    }),
    updateDispatch: build.mutation<
      Omit<UpdateDispatchPayload, "id">,
      UpdateDispatchPayload
    >({
      query: ({ id, ...body }) => ({
        url: `${DISPATCH_SERVICE_PATH}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Dispatches", id },
        { type: "Dispatches", id: "LIST" },
      ],
    }),
    deleteDispatch: build.mutation<void, DeleteDispatchParams>({
      query: ({ id }) => ({
        url: `${DISPATCH_SERVICE_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Dispatches", id },
        { type: "Dispatches", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetDispatchesQuery,
  useGetDispatchQuery,
  useCreateDispatchMutation,
  useUpdateDispatchMutation,
  useDeleteDispatchMutation,
} = dispatchesApiSlice;
