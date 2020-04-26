import React, { createContext, useState, useEffect } from "react";
import { getRandomQuote } from "../api/quote";
import { getRandomImage } from "../api/unsplash";

const InspirationContext = createContext();

const BG_THEME = "nature";

const InspirationProvider = ({ children }) => {
	const [quote, setQuote] = useState(null);
	const [bg, setBg] = useState(null);

	useEffect(() => {
		const getData = async () => {
			Promise.all([getRandomQuote(), getRandomImage(BG_THEME)]).then(
				([quote, image]) => {
					setQuote(quote);
					setBg(image);
				}
			);
		};
		getData();
		// eslint-disable-next-line
	}, []);

	return (
		<InspirationContext.Provider value={{ quote, bg }}>
			{children}
		</InspirationContext.Provider>
	);
};

export default InspirationContext;
export { InspirationProvider };
