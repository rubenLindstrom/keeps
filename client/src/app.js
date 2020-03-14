import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/notFound";

// Components
import AuthRoute from "./components/authRoute";

const app = () => {
  return (
    <div className="main">
      <Switch>
        <AuthRoute path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default app;
