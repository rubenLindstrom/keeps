import React, { useContext, useEffect, useState } from "react";

import AuthContext from "./contexts/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Dashboard from "./pages/dashboard";
import RegisterLogin from "./pages/registerLogin";

import { getRandomQuote } from "./api/quote";
import { getRandomImage } from "./api/unsplash";

toast.configure();
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
      {authenticated !== null && authenticated ? (
        <Dashboard />
      ) : (
        <RegisterLogin quote={quote} bg={bg} />
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};

export default App;
