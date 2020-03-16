import Axios from "axios";

import { dummy, delay } from "./helpers";

const axios = Axios.create({
  baseURL: "http://localhost:5000/keeps-81a16/europe-west2/api"
});

axios.interceptors.request.use(
  req => {
    console.log(req);
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  res => {
    console.log(res);
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

// TODO: If res.status = 403, log user out
export const setToken = token => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const unsetToken = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

// Auth
export const doLogin = (email, password, cPassword) =>
  axios.post("/login", { email, password, cPassword });

export const doLogout = () => delay({ success: true }, 0);
// export const doLogout = () => axios.post("/logout");

export const doRegister = (email, password, cPassword) =>
  axios.post("/register", { email, password, cPassword });

export const doValidateToken = token => delay({ success: true }, 500);
// export const doValidateToken = token => axios.post("/validateToken", { token });

// Notes
// export const doGetNotes = () => axios.get("/notes");
export const doGetNotes = () => delay({ data: dummy.notes }, 500);

export const doAddNote = title => axios.post("/notes", { title });
export const doUpdateNote = id => {};
export const doDeleteNote = id => {};
