import axios from "axios";

export const bookmarkDestination = async (destinationId, token) => {
  try {
    const response = await axios.post(
      `/api/profile/bookmarks/${destinationId}`,
      {}, // empty body since we're just adding a bookmark
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Bookmarking destination error:", error);
    throw error;
  }
};

export const unbookmarkDestination = async (destinationId, token) => {
  try {
    const response = await axios.delete(
      `/api/profile/bookmarks/${destinationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Unbookmarking destination error:", error);
    throw error;
  }
};

export const getBookmarkedDestinations = async (token) => {
  try {
    const response = await axios.get(`/api/profile/bookmarks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Getting bookmarked destinations error:", error);
    throw error;
  }
};

export const getAllDestinations = async () => {
  try {
    const response = await axios.get("/api/destinations");
    return response.data;
  } catch (error) {
    console.error("Getting all destinations error:", error);
    throw error;
  }
};
