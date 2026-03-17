import axios from "axios";

const USER_API = axios.create({
  baseURL: "http://localhost:8081",
});

const ADMIN_API = axios.create({
  baseURL: "http://localhost:8082",
});

/* AUTH */

export const loginUser = (data) => USER_API.post("/auth/login", data);

export const registerUser = (data) => USER_API.post("/auth/register", data);

/* APPS */

export const getApps = () => ADMIN_API.get("/admin/apps");

export const addApp = (data) => ADMIN_API.post("/admin/apps", data);

export const deleteApp = (id) => ADMIN_API.delete(`/admin/apps/${id}`);

export const updateApp = (id, data) =>
  ADMIN_API.put(`/admin/apps/${id}`, data);

/* REVIEWS */

export const addReview = (data) => USER_API.post("/reviews", data);

export const getReviews = (appId) => {
  if (!appId) return Promise.resolve({ data: [] });
  return USER_API.get(`/reviews/app/${appId}`);
};

export const getRating = (appId) => {
  if (!appId) return Promise.resolve({ data: 0 });
  return USER_API.get(`/reviews/rating/${appId}`);
};

/* DOWNLOADS */

export const downloadApp = (appId, userId) =>
  USER_API.post(`/downloads/${appId}/${userId}`);

export const uninstallApp = (appId, userId) =>
  USER_API.delete(`/downloads/${appId}/${userId}`);

export const getDownloadCount = (appId) =>
  USER_API.get(`/downloads/count/${appId}`);

export const getDownloads = () => USER_API.get("/downloads");

/* USER INSTALLED APPS */

export const getUserDownloads = (userId) =>
  USER_API.get(`/downloads/user/${userId}`);