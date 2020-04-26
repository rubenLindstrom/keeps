import { delay } from "../helpers";

const URL: string = "https://type.fit/api/quotes";

const MOCK = false;
const mockQuote: Quote = {
	text:
		"A happy man is not sad, neither is he every satisfied. True wisdom lies in accepting what you have, and letting go of what you have not",
	author: "Ruben"
};

export const getRandomQuote: () => Promise<Quote> = async () =>
	MOCK
		? delay(mockQuote, 500)
		: await fetch(URL)
				.then((res) => res.json())
				.then((quotes) => {
					const randomQuote =
						quotes[Math.floor(Math.random() * quotes.length)];
					if (!randomQuote.author) randomQuote.author = "Unknown";
					return randomQuote;
				});
