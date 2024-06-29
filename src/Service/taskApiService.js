import { toast } from "react-toastify";
import axios from "axios";
import { apiEndPoints } from "../Utils/apiEndPoints";

export const getAllTask = async () => {
  try {
    const response = await axios.get(apiEndPoints.getAllTaskApi);
    return response?.data;
  } catch (error) {
    toast.error(
      `Something went wrong while fetching getAllTask: ${error.message}`
    );
    return null;
  }
};
export const uploadTaskImageApiService = async (data) => {
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await axios.post(apiEndPoints.uploadTaskImageApi, data, {
      headers,
    });
    return response;
  } catch (error) {
    toast.error(`Upload failed: ${error.message}`);
    return null;
  }
};
