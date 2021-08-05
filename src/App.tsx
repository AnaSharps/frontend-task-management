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
import { AdminHome } from "./screens/AdminHome";

function App() {
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
						<Route path="/admin">
							<AdminHome>
								<Router>
									<Switch>
										<Route path="/admin/loggedin">
											<Dashboard admin />
										</Route>
										<Route path="/admin/addUser">
											<Signup admin />
										</Route>
										<Route path="/admin/changePassword">
											<ChangePass />
										</Route>
									</Switch>
								</Router>
							</AdminHome>
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
