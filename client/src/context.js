import React, { useState, useEffect, createContext } from "react";

import { doLogin, setToken } from "./services";

const Context = createContext();

const Provider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = (email, password) => {
    doLogin(email, password).then(res => {
      if (res.data.token) {
        setToken(res.data.token);
        setAuthenticated(true);
      }
    });
  };
  return (
    <Context.Provider value={{ authenticated, login }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
export { Provider };
