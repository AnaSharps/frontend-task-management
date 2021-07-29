import React from "react";
import "./App.css";
import { Login } from "./screens/Login";
import { Register } from "./screens/Registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./screens/UserManagement";
import { Home } from "./screens/Home";
import { Signup } from "./screens/Signup";
import { ForgotPass } from "./screens/ForgotPass";
import { ChangePass } from "./screens/ChangePass";

function App() {
	return (
		<div className="App">
			<div className="App-header">
				<Router>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register">
							<Signup />
						</Route>
						<Route path="/forgotPassword">
							<ForgotPass />
						</Route>
						<Route path="/resetPass/*">
							<ChangePass forgot />
						</Route>
						<Route path="/verifyEmail/*">
							<Register />
						</Route>
						<Route path="/home/changePassword">
							<ChangePass />
						</Route>
						<Route path="/home/loggedin">
							<Dashboard />
						</Route>
						<Route path="/">
							<Login />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
