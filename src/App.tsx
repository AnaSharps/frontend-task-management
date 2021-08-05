import React, { ReactNode, useEffect } from "react";
import "./App.css";
import { Login } from "./screens/Login";
import { Register } from "./screens/Registration";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import { Dashboard } from "./screens/UserManagement";
import { Home } from "./screens/Home";
import { Signup } from "./screens/Signup";
import { ForgotPass } from "./screens/ForgotPass";
import { ChangePass } from "./screens/ChangePass";
import { UnauthorisedForms } from "./screens/UnauthorisedForms";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectStatus } from "./features/loading";
import { authorizationInit } from "./features/authorization";

export interface FCProps {
	routes?: RouteType[];
	forgot?: boolean;
}

export type RouteType = {
	path: string;
	component: React.FC<FCProps>;
	forgot?: boolean;
	routes?: RouteType[];
};

export function RouteWithSubRoutes(route: RouteType) {
	return (
		<Route
			path={route.path}
			render={(props) => (
				// pass the sub-routes down to keep nesting
				<route.component
					{...props}
					forgot={route.forgot}
					routes={route.routes}
				/>
			)}
		/>
	);
}

function App() {
	const routes = [
		{
			path: "/app",
			component: UnauthorisedForms,
			routes: [
				{
					path: "/app/login",
					component: Login,
				},
				{
					path: "/app/register",
					component: Signup,
				},
				{
					path: "/app/verifyEmail/*",
					component: Register,
				},
				{
					path: "/app/forgotPassword",
					component: ForgotPass,
				},

				{
					path: "/app/resetPass/*",
					forgot: true,
					component: ChangePass,
				},
			],
		},
		{
			path: "/home",
			component: Home,
			routes: [
				{
					path: "/home/loggedin",
					component: Dashboard,
				},
				{
					path: "/home/changePassword",
					component: ChangePass,
				},
			],
		},
		// {
		// 	path: "/admin",
		// 	component: AdminHome,
		// }
	];

	return (
		<div className="App">
			<div className="App-header">
				<Router>
					<Switch>
						<Route path="/app">
							<UnauthorisedForms>
								<Router>
									<Switch>
										<Route path="/app/login">
											<Login />
										</Route>
										<Route path="/app/register">
											<Signup />
										</Route>
										<Route path="/app/verifyEmail/*">
											<Register />
										</Route>
										<Route path="/app/forgotPassword">
											<ForgotPass />
										</Route>
										<Route path="/app/resetPass/*">
											<ChangePass forgot />
										</Route>
									</Switch>
								</Router>
							</UnauthorisedForms>
						</Route>
						<Route path="/home">
							<Home>
								<Router>
									<Switch>
										<Route path="/home/loggedin">
											<Dashboard />
										</Route>
										<Route path="/home/changePassword">
											<ChangePass />
										</Route>
									</Switch>
								</Router>
							</Home>
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
