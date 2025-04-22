import { postsApiSlice } from "src/modules/posts/postsApiSlice";
import {
  getPostsResponse,
  getPostResponse,
  createPostPayload,
  updatePostPayload,
} from "src/modules/posts/mocks";
import { makeStore } from "src/app/store";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

describe("postsApiSlice", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("fetches posts successfully via getPosts endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(getPostsResponse));
    const store = makeStore();
    const result = await store.dispatch(
      postsApiSlice.endpoints.getPosts.initiate(5),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe("https://dummyjson.com/posts?limit=5");
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getPostsResponse);
    expect(result.error).toBeUndefined();
  });

  test("fetches a single post successfully via getPost endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(getPostResponse));
    const store = makeStore();
    const result = await store.dispatch(
      postsApiSlice.endpoints.getPost.initiate(1),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe("https://dummyjson.com/posts/1");
    expect(call.method).toBe("GET");
    expect(result.data).toEqual(getPostResponse);
    expect(result.error).toBeUndefined();
  });

  test("creates a new post successfully via createPost endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(createPostPayload));
    const store = makeStore();
    const result = await store.dispatch(
      postsApiSlice.endpoints.createPost.initiate(createPostPayload),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe("https://dummyjson.com/posts/add");
    expect(call.method).toBe("POST");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await call.json();
    expect(body).toEqual(createPostPayload);
    expect(result.data).toEqual(createPostPayload);
    expect(result.error).toBeUndefined();
  });

  test("updates a post successfully via updatePost endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(updatePostPayload));
    const store = makeStore();
    const result = await store.dispatch(
      postsApiSlice.endpoints.updatePost.initiate(updatePostPayload),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe(
      `https://dummyjson.com/posts/${updatePostPayload.id.toString()}`,
    );
    expect(call.method).toBe("PATCH");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...updatePostBody } = updatePostPayload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await call.json();
    expect(body).toEqual(updatePostBody);
    expect(result.data).toEqual(updatePostPayload);
    expect(result.error).toBeUndefined();
  });

  test("deletes a post successfully via deletePost endpoint", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(getPostsResponse));
    const store = makeStore();
    const result = await store.dispatch(
      postsApiSlice.endpoints.deletePost.initiate(1),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const call = fetchMock.mock.calls[0][0] as Request;
    expect(call.url).toBe("https://dummyjson.com/posts/1");
    expect(call.method).toBe("DELETE");
    expect(result.data).toEqual(getPostsResponse);
    expect(result.error).toBeUndefined();
  });

  test("handles errors correctly via getPosts endpoint", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 },
    );
    const store = makeStore();
    const result = await store.dispatch(
      postsApiSlice.endpoints.getPosts.initiate(5),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const error = result.error as FetchBaseQueryError;
    expect(error.status).toBe(500);
    expect(error.data).toBeDefined();
  });
});
