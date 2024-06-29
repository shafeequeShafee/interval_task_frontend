import { data } from "../Common/config";
export const apiEndPoints = {
  uploadTaskImageApi: data?.apiBaseUrl + "/task-router/upload-task-image",
  getAllTaskApi: data?.apiBaseUrl + "/task-router/get-all-task",
  updateTaskApi: data?.apiBaseUrl + "/task-router/update-task-list",
};
