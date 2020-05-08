import Unsplash, { toJson } from "unsplash-js";
import { delay } from "../helpers";
import spaceImg from "../images/space-bg2.jpg";

const MOCK = false;
const mockBg: BG = {
  credit: "ruben",
  highResUrl: spaceImg,
  lowResUrl: spaceImg,
  original: "",
};

const unsplash: Unsplash = new Unsplash({
  accessKey: process.env.REACT_APP_UNSPLASH_API_KEY || "",
});

export const getRandomImage: (query: string) => Promise<BG> = (query) =>
  MOCK
    ? delay(mockBg, 500)
    : unsplash.photos
        .getRandomPhoto({ query, count: 1, orientation: "landscape" })
        .then(toJson)
        .then((json) => {
          // console.log(json);
          const { urls, user, links } = json[0];
          return {
            highResUrl: urls.full,
            lowResUrl: urls.regular,
            credit: user.name,
            original: links.html,
          };
        })
        .catch(() => "");
