import axios from "axios";
import { getAccessToken } from "../../utils/common-utils";
const URL = "http://localhost:8000";

const api = axios.create({
  baseURL: URL,
  headers: {
    Authorization: getAccessToken(),
    "Content-Type": "application/json",
  },
});

export const SignUpApi = (user) => {
  return api.post("/signup", user);
};

export const LoginApi = (user) => {
  return api.post("/login", user);
};

export const UploadApi = (file) => {
  return api.post("/file/upload", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const SavePostApi = (post) => {
  return api.post("/create", post);
};
