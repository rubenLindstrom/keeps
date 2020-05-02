import { v4 as uuidv4 } from "uuid";
import { errorTranslations, FALLBACK_ERROR_MESSAGE } from "./constants";

export const isEmpty: (str: string) => boolean = (str) => str.length === 0;

export const hasErrors: (err: ErrorResponse) => boolean = (err) =>
	Object.keys(err).length > 0;

export const isEmail: (email: string) => boolean = (email) =>
	email.match(
		//eslint-disable-next-line
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)
		? true
		: false;

export const isEnterKey: (e: KeyboardEvent) => boolean = (e) =>
	e.keyCode === 13 || e.which === 13;

type ServerError = { [key: string]: string };
type FirebaseClientError = {
	code: number;
	message: string;
};

const errorFields = ["email", "password", "cPassword", "error"];
export const translateServerError: (err: ServerError) => ErrorResponse = (
	err: ServerError
) => {
	const errors: ErrorResponse = {};
	errorFields.forEach((key) => {
		const translation = errorTranslations[err[key]];
		if (translation) errors[key] = translation;
	});
	console.log(errors);
	console.log(hasErrors(errors));
	if (!hasErrors(errors)) errors.error = FALLBACK_ERROR_MESSAGE;
	return errors;
};

export const translateClientError: (
	err: FirebaseClientError
) => ErrorResponse = (err) => {
	const translation = errorTranslations[err.code];
	return { error: translation ? translation : FALLBACK_ERROR_MESSAGE };
};

export const delay: (v: any, t: number) => Promise<any> = (v, t) =>
	new Promise<Object>((resolve, _) => {
		setTimeout(() => resolve(v), t);
	});

const ids: Array<string> = Array(7).map(() => uuidv4());

export const dummy: { notes: { [key: string]: Note } } = {
	notes: {
		[ids[0]]: {
			title: "Test",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			body: "Today is good",
			id: ids[0],
			sharedWith: [],
			owner: uuidv4()
		},
		[ids[1]]: {
			title: "Frankrike",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			body: "Viva la france",
			id: ids[1],
			sharedWith: [],
			owner: uuidv4()
		},
		[ids[2]]: {
			title: "Schweiz",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			body: "Long walks and nice cheese",
			id: ids[2],
			sharedWith: [],
			owner: uuidv4()
		},
		[ids[3]]: {
			title: "Jempa",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			body: "Ja må hon leva uti hundrade år",
			id: ids[3],
			sharedWith: [],
			owner: uuidv4()
		},
		[ids[4]]: {
			title: "Jempa",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			body: "Ja må hon leva uti hundrade år",
			id: ids[4],
			sharedWith: [],
			owner: uuidv4()
		},
		[ids[5]]: {
			title: "Jempa",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			body: "Ja må hon leva uti hundrade år",
			id: ids[5],
			sharedWith: [],
			owner: uuidv4()
		},
		[ids[6]]: {
			title: "Jempa",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			body: "Ja må hon leva uti hundrade år",
			id: ids[6],
			sharedWith: [],
			owner: uuidv4()
		}
	}
};
