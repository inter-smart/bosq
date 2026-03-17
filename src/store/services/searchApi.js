import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
    reducerPath: "searchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),
    tagTypes: ["Search"],
    endpoints: (builder) => ({
        getSearch: builder.query({
            query: (params) => `/api/frontend/products/product-search-by-keywords?keywords=${params.keywords}`,
            providesTags: ["Search"],
        }),
    }),
});


export const {
    useGetSearchQuery,
    useLazyGetSearchQuery
} = searchApi;