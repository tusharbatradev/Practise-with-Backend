import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => `/`,
    }),
    deleteData: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    postData: builder.mutation({
      query: ({ name, id }) => ({
        url: "/",
        method: "POST",
        body: { name, id },
      }),
    }),
  }),
});

export const { useGetDataQuery, useDeleteDataMutation, usePostDataMutation } = api;
