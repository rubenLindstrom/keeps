import React, { useContext, useEffect, useState } from "react";

import AuthContext from "./contexts/authContext";

// Pages
import Dashboard from "./pages/dashboard";
import RegisterLogin from "./pages/registerLogin";

import { getRandomQuote } from "./api/quote";
import { getRandomImage } from "./api/unsplash";

const BG_THEME = "nature";

const App = () => {
  const [quote, setQuote] = useState(null);
  const [bg, setBg] = useState(null);
  const { authenticated } = useContext(AuthContext);

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
    <main style={{ backgroundImage: `url(${bg && bg.url})` }}>
      {authenticated ? <Dashboard /> : <RegisterLogin quote={quote} bg={bg} />}
    </main>
  );
};

export default App;
