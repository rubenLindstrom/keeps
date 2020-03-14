import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/keeps-81a16/europe-west2/api"
});

axios.interceptors.request.use(
  req => {
    console.log(req);
    return req;
  },
  error => {
    // handle the response error
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  res => {
    console.log(res);
    return res;
  },
  error => {
    // handle the response error
    return Promise.reject(error);
  }
);

// TODO: If res.status = 403, log user out
export const setToken = token =>
  (axios.defaults.headers.common["authorization"] = `Bearer ${token}`);
// Auth
export const register = (email, password, cPassword) =>
  axios.post("/register", { email, password, cPassword });
export const doLogin = (email, password) =>
  axios.post("/login", { email, password });

// Notes
export const getNotes = () => {};
export const addNote = title => {};
export const updateNote = id => {};
export const deleteNote = id => {};
