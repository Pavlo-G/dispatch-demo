import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { makeStore } from "src/app/store";
import { BASE_URL, TECH_SERVICE_PATH } from "src/config";
import { techniciansApiSlice } from "src/modules/techService/techniciansApiSlice";
import {
  getTechnicianResponse,
  getTechniciansResponse,
} from "src/modules/techService/mocks";

const techServiceUrl = `${BASE_URL}${TECH_SERVICE_PATH}`;

describe("techniciansApiSlice", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetches technicians successfully via getTechnicians endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(getTechniciansResponse), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      techniciansApiSlice.endpoints.getTechnicians.initiate(),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(techServiceUrl);
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getTechniciansResponse);
    expect(result.error).toBeUndefined();
  });

  test("fetches a single technician successfully via getTechnician endpoint", async () => {
    const id = "TECH1243";
    fetchMock.mockResponseOnce(JSON.stringify(getTechnicianResponse), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      techniciansApiSlice.endpoints.getTechnician.initiate({ id }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(`${techServiceUrl}/${id}`);
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getTechnicianResponse);
    expect(result.error).toBeUndefined();
  });

  test("handles errors correctly via getTechnicians endpoint", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 },
    );
    const store = makeStore();
    const result = await store.dispatch(
      techniciansApiSlice.endpoints.getTechnicians.initiate(),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const error = result.error as FetchBaseQueryError;
    expect(error.status).toBe(500);
    expect(error.data).toBeDefined();
  });
});
