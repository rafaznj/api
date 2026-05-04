import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const updatePost = async (id: number) => {
  const response = await api.put(`/posts/${id}`);
  return response.data;
};

export const deletePost = async (id: number) => {
  try {
    await api.delete(`/posts/${id}`);
    return true;
  } catch {
    return false;
  }
};
