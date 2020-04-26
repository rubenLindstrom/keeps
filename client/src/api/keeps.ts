import Axios from "axios";

import { dummy, delay } from "../helpers";

const axios = Axios.create({
	baseURL: "http://localhost:5000/keeps-81a16/europe-west2/api"
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

// TODO: If res.status = 403, log user out
export const setToken: (token: string) => void = (token) => {
	localStorage.setItem("token", token);
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const unsetToken: () => void = () => {
	localStorage.removeItem("token");
	delete axios.defaults.headers.common["Authorization"];
};

const MOCK: boolean = false;
const MOCK_TIME: number = 100;

type ApiSuccess = Promise<{ success: boolean }>;

// Auth
export const doRegister: (
	email: string,
	password: string,
	cPassword: string
) => Promise<string> = (email, password, cPassword) =>
	axios
		.post("/register", { email, password, cPassword })
		.then((res) => res.data.token);

export const doValidateToken: (token: string) => ApiSuccess = MOCK
	? (token) => delay({ success: true }, MOCK_TIME)
	: (token) =>
			axios
				.post("/validateToken", { token })
				.then((res) => res.data.success);

// Notes
export const doAddNote: (title: string) => Promise<any> = (title) =>
	axios.post("/notes", { title }).then((res) => res.data);

export const doGetNotes: () => Promise<{ [key: string]: Note }> = MOCK
	? () => delay(dummy.notes, MOCK_TIME)
	: () => axios.get("/notes").then((res) => res.data);

export const doDeleteNote: (id: string) => ApiSuccess = MOCK
	? (id) => delay({ success: true }, MOCK_TIME)
	: (id) => axios.delete(`/notes/${id}`).then((res) => res.data);

export const doUpdateNote: (id: string, newNote: Note) => ApiSuccess = MOCK
	? (id, newNote) => delay({ success: true }, MOCK_TIME)
	: (id, newNote) => axios.patch(`/notes/${id}`, newNote);

export const doShare: (email: string, noteId: string) => ApiSuccess = MOCK
	? (email, noteId) => delay({ success: true }, MOCK_TIME)
	: (email, noteId) =>
			axios.post(`/notes/${noteId}/share`, { shareWith: email });
