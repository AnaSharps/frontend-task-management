import React from "react";
import "./App.css";
import { Login } from "./screens/Login";
import { Register } from "./screens/Registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "./screens/UserManagement";

function App() {
	return (
		<div className="App">
			<div className="App-header">
				<Router>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						{/* <Route path="/register">
							<Register />
						</Route> */}
						<Route path="/loggedin">
							<Dashboard />
						</Route>
						<Route path="/verifyEmail/*">
							<Register />
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
