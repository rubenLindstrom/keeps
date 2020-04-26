const URL: string = "https://type.fit/api/quotes";

export const getQuote: () => Promise<Quote> = async () => {
	return await fetch(URL)
		.then((res) => res.json())
		.then((quotes) => quotes[Math.floor(Math.random() * quotes.length)]);
};
