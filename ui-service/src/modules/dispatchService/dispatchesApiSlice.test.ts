import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { makeStore } from "src/app/store";
import { BASE_URL, DISPATCH_SERVICE_PATH } from "src/config";
import { dispatchesApiSlice } from "src/modules/dispatchService/dispatchesApiSlice";
import {
  createDispatchPayload,
  getDispatchesResponse,
  getDispatchResponse,
} from "src/modules/dispatchService/mocks";

const dispatchServiceUrl = `${BASE_URL}${DISPATCH_SERVICE_PATH}`;

describe("dispatchesApiSlice", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetches dispatches successfully via getDispatches endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(getDispatchesResponse), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      dispatchesApiSlice.endpoints.getDispatches.initiate(),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(dispatchServiceUrl);
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getDispatchesResponse);
    expect(result.error).toBeUndefined();
  });

  test("fetches a single dispatch successfully via getDispatch endpoint", async () => {
    const id = "DISPATCH2952";
    fetchMock.mockResponseOnce(JSON.stringify(getDispatchResponse), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      dispatchesApiSlice.endpoints.getDispatch.initiate({ id }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(`${dispatchServiceUrl}/${id}`);
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getDispatchResponse);
    expect(result.error).toBeUndefined();
  });

  test("creates a new dispatch successfully via createDispatch endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(createDispatchPayload), {
      status: 201,
    });
    const store = makeStore();
    const result = await store.dispatch(
      dispatchesApiSlice.endpoints.createDispatch.initiate(
        createDispatchPayload,
      ),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(dispatchServiceUrl);
    expect(call.method).toBe("POST");
    const body = await call.json();
    expect(body).toEqual(createDispatchPayload);
    expect(result.data).toEqual(createDispatchPayload);
    expect(result.error).toBeUndefined();
  });

  test("updates a dispatch successfully via updateDispatch endpoint", async () => {
    const updateDispatchPayload = {
      id: "DISPATCH2952",
      appointmentDateTime: "2025-04-11T03:30:00.000Z",
    };
    fetchMock.mockResponseOnce(JSON.stringify(updateDispatchPayload), {
      status: 200,
    });
    const store = makeStore();
    const result = await store.dispatch(
      dispatchesApiSlice.endpoints.updateDispatch.initiate(
        updateDispatchPayload,
      ),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(`${dispatchServiceUrl}/${updateDispatchPayload.id}`);
    expect(call.method).toBe("PUT");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...updateDispatchBody } = updateDispatchPayload;
    const body = await call.json();
    expect(body).toEqual(updateDispatchBody);
    expect(result.data).toEqual(updateDispatchPayload);
    expect(result.error).toBeUndefined();
  });

  test("deletes a dispatch successfully via deleteDispatch endpoint", async () => {
    const id = "DISPATCH2952";
    fetchMock.mockResponseOnce(null, { status: 204 });
    const store = makeStore();
    const result = await store.dispatch(
      dispatchesApiSlice.endpoints.deleteDispatch.initiate({ id }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(`${dispatchServiceUrl}/${id}`);
    expect(call.method).toBe("DELETE");
    expect(result.data).toBeNull();
    expect(result.error).toBeUndefined();
  });

  test("handles errors correctly via getDispatches endpoint", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 },
    );
    const store = makeStore();
    const result = await store.dispatch(
      dispatchesApiSlice.endpoints.getDispatches.initiate(),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const error = result.error as FetchBaseQueryError;
    expect(error.status).toBe(500);
    expect(error.data).toBeDefined();
  });
});
