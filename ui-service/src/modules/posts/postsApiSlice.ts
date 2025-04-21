import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostsApiResponse, Post } from "src/modules/posts/types";

export const postsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  reducerPath: "postsApi",
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    getPosts: build.query<PostsApiResponse, number>({
      query: (limit = 5) => `/posts?limit=${limit.toString()}`,
      providesTags: (result) =>
        result?.posts
          ? [
              ...result.posts.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query<Post, number>({
      query: (id) => `/posts/${id.toString()}`,
      providesTags: (_result, _error, id) => [{ type: "Posts", id }],
    }),
    createPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "/posts/add",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: build.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id.toString()}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Posts", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
    deletePost: build.mutation<Post, number>({
      query: (id) => ({
        url: `/posts/${id.toString()}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Posts", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;
