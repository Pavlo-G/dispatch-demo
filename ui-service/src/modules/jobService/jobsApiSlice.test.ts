import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { makeStore } from "src/app/store";
import { BASE_URL, JOB_SERVICE_PATH } from "src/config";
import { jobsApiSlice } from "src/modules/jobService/jobsApiSlice";
import { getJobResponse, getJobsResponse } from "src/modules/jobService/mocks";
import { JobState } from "src/types/JobState";

const jobServiceUrl = `${BASE_URL}${JOB_SERVICE_PATH}`;

describe("jobsApiSlice", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetches jobs successfully via getJobs endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(getJobsResponse), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      jobsApiSlice.endpoints.getJobs.initiate(),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(jobServiceUrl);
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getJobsResponse);
    expect(result.error).toBeUndefined();
  });

  test("fetches a single job successfully via getJob endpoint", async () => {
    const id = "JOB5678";
    fetchMock.mockResponseOnce(JSON.stringify(getJobResponse), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      jobsApiSlice.endpoints.getJob.initiate({ id }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(`${jobServiceUrl}/${id}`);
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getJobResponse);
    expect(result.error).toBeUndefined();
  });

  test("updates a job successfully via updateJob endpoint", async () => {
    const updateJobPayload = {
      id: "JOB5678",
      state: JobState.InProgress,
      technicianId: "TECH5811",
      dispatchId: "DISPATCH2952",
    };
    fetchMock.mockResponseOnce(JSON.stringify(updateJobPayload), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      jobsApiSlice.endpoints.updateJob.initiate(updateJobPayload),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(`${jobServiceUrl}/${updateJobPayload.id}`);
    expect(call.method).toBe("PUT");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...updateJobBody } = updateJobPayload;
    const body = await call.json();
    expect(body).toEqual(updateJobBody);
    expect(result.data).toEqual(updateJobPayload);
    expect(result.error).toBeUndefined();
  });

  test("handles errors correctly via getJobs endpoint", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 },
    );
    const store = makeStore();
    const result = await store.dispatch(
      jobsApiSlice.endpoints.getJobs.initiate(),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const error = result.error as FetchBaseQueryError;
    expect(error.status).toBe(500);
    expect(error.data).toBeDefined();
  });
});
