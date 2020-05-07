import {} from "styled-components/cssprop";

declare global {
	type Note = {
		title: string;
		createdAt: string;
		updatedAt: string;
		body: string;
		id: string;
		sharedWith: Array<string>;
		owner: string;
	};

	type BG = {
		credit: string;
		url: string;
		original: string;
	};

	type Quote = {
		text: string;
		author: string;
	};

	type ErrorResponse = { [key: string]: string };
}