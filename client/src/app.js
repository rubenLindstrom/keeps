import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import NotFound from "./pages/notFound";

// Components
import AuthRoute from "./components/authRoute";

const app = () => {
  return (
    <div className="main">
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default app;
