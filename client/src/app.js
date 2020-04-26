import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import InspirationContext from "./contexts/inspirationContext";

// Pages
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/notFound";

import { AuthRoute, UnAuthRoute } from "./components/authRoute";
import BottomBar from "./components/bottomBar";

const App = () => {
	const { bg } = useContext(InspirationContext);

	return (
		<main
			style={{
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundImage: `url(${bg && bg.url})`,
				position: "relative"
			}}
		>
			<Switch>
				<AuthRoute path="/" component={Dashboard} exact />
				<UnAuthRoute
					path="/login"
					render={(props) => (
						<>
							<Login {...props} />
							<BottomBar />
						</>
					)}
				/>
				<UnAuthRoute
					path="/register"
					render={(props) => (
						<>
							<Register {...props} />
							<BottomBar />
						</>
					)}
				/>
				<Route component={NotFound} />
			</Switch>
		</main>
	);
};

export default App;
