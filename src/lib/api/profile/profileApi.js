import { fetchApi, sendError, sendSuccess } from "../client";

export const ProfileData = {
  getMyProfile: async () => {
    try {
      const data = await fetchApi(
        `/api/frontend/profile/my-profile`,
        {
          credentials: "include", // ✅ this is enough
        },
        true,
      );

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getOrders: async () => {
    try {
      const data = await fetchApi(
        `/api/frontend/orders`,
        {
          credentials: "include", // ✅ this is enough
        },
        true,
      );

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  fetchProfileById: async () => {
    try {
      const data = await fetchApi(
        `/api/frontend/profile/fetch-profile-by-id`,
        {
          credentials: "include", // ✅ this is enough
        },
        true,
      );

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  editProfile: async (profileData) => {
    try {
      const data = await fetchApi(
        `/api/frontend/profile/edit-profile`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(profileData),
        },
        true,
      );
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getAddress: async () => {
    try {
      const {data} = await fetchApi(
        `/api/frontend/address`,
        {
          method: "GET",
          credentials: "include",
        },
        true,
      );
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getCoupons: async () => {
    try {
      const data = await fetchApi(
        "/api/frontend/coupons",
        {
          method: "GET",
          credentials: "include",
        },
        true,
      );
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
