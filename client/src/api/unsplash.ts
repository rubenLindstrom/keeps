import Unsplash, { toJson } from "unsplash-js";
import { delay } from "../helpers";
import spaceImg from "../images/space-bg2.jpg";

const MOCK = false;
const mockBg: BG = { credit: "ruben", url: spaceImg };

const unsplash: Unsplash = new Unsplash({
	accessKey: process.env.REACT_APP_UNSPLASH_API_KEY || ""
});

export const search: (query: string) => Promise<string> = (query) =>
	unsplash.search
		.photos(query, 1, 1, { orientation: "landscape" })
		.then(toJson)
		.then((json) => {
			console.log(json);
			return json.results[0].urls.raw;
		})
		.catch(() => "");

export const getRandomImage: (query: string) => Promise<BG> = (query) =>
	MOCK
		? delay(mockBg, 500)
		: unsplash.photos
				.getRandomPhoto({ query, count: 1, orientation: "landscape" })
				.then(toJson)
				.then((json) => {
					console.log(json);
					return {
						url: json[0].urls.full,
						credit: json[0].user.name
					};
				})
				.catch(() => "");
