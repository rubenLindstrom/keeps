import Axios from "axios";

import { dummy, delay } from "./helpers";

const axios = Axios.create({
  // Local
  // baseURL: "http://localhost:5000/keeps-81a16/europe-west2/api",
  // Live
  baseURL: "https://europe-west2-keeps-81a16.cloudfunctions.net/api",
});

axios.interceptors.request.use(
  (req) => {
    console.log(req);
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const unsetToken = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

const MOCK = false;
const MOCK_TIME = 100;

// Auth
export const doRegister = (email, password, cPassword) =>
  axios
    .post("/register", { email, password, cPassword })
    .then((res) => res.data.token);

export const doValidateToken = MOCK
  ? (token) => delay({ success: true }, MOCK_TIME)
  : (token) =>
      axios.post("/validateToken", { token }).then((res) => res.data.success);

// Notes
export const doAddNote = (title) =>
  axios.post("/notes", { title }).then((res) => res.data);

export const doGetNotes = MOCK
  ? () => delay(dummy.notes, MOCK_TIME)
  : () => axios.get("/notes").then((res) => res.data);

export const doDeleteNote = MOCK
  ? (id) => delay({ success: true }, MOCK_TIME)
  : (id) => axios.delete(`/notes/${id}`).then((res) => res.data);

export const doUpdateNote = MOCK
  ? (id, newNote) => delay({ success: true }, MOCK_TIME)
  : (id, newNote) => axios.patch(`/notes/${id}`, newNote);

export const doShare = MOCK
  ? (email, noteId) => delay({ success: true }, MOCK_TIME)
  : (email, noteId) =>
      axios.post(`/notes/${noteId}/share`, { shareWith: email });
