import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/keeps-81a16/europe-west2/api"
});

// Auth
export const register = (email, password, cPassword, handle) => {};
export const login = (email, password) => {
  axios.post("/login", { email, password });
};

// Notes
export const getNotes = () => {};
export const addNote = title => {};
export const updateNote = id => {};
export const deleteNote = id => {};
