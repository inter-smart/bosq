import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productEnquiryApi = createApi({
    reducerPath: "productEnquiryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),
    endpoints: (builder) => ({
        submitProductEnquiry: builder.mutation({
            query: (data) => ({
                url: "/api/frontend/enquiries/product",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
        }),
    }),
});

export const { useSubmitProductEnquiryMutation } = productEnquiryApi;
