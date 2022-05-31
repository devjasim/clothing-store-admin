import axios from "axios";

const API = axios.create({ baseURL: `${process.env.NODE_ENV === "development" ? "http://localhost:3001/api/v1/admin" : "https://api.stablespay.com/api/v1/admin"}` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token"))
    } `;
  }
  return req;
});

export const fetchUsers = () => API.get("/get-users");
// export const createUser = (newPost) => API.post("/create", newPost);
export const updateUser = (id, updatedData) =>
  API.patch(`/update-user/${id}`, updatedData);

export const deleteUser = (id) => API.delete(`/delete-user/${id}`);

export const getUserById = (id) => API.get(`/get-user/${id}`);

// Sign in route
export const signIn = (formData) => API.post("/signin", formData);
// export const signUp = (formData) => API.post("/signup", formData);
export const createUser = (formData) => API.post("/create-user", formData);

export const fetchDashboard = () => API.get("/dashboard");
