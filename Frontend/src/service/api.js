import axios from "axios";
import { getAccessToken } from "../../utils/common-utils";
const URL = "http://localhost:8000";

const api = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers["Authorization"] = accessToken;
  }
  return config;
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

export const newComment = (post) => {
  return api.post("/comment/new", post);
};

export const getAllComments = (id) => {
  return api.get(`/comments/${id}`);
};

export const showAllPosts = (category) => {
  return api.get("/posts", {
    params: { category },
  });
};

export const getPostById = (id) => {
  return api.get(`/post/${id}`);
};

export const updatePost = (post, id) => {
  return api.put(`/update/${id}`, post);
};

export const deletePost = (id) => {
  return api.delete(`/delete/${id}`);
};

export const deleteComment = (id) => {
  return api.delete(`/comment/delete/${id}`);
};
