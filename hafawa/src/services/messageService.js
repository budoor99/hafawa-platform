import axios from "axios";

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post("/api/messages", messageData);
    return response.data;
  } catch (error) {
    console.error("Message send error:", error);
    throw error;
  }
};
