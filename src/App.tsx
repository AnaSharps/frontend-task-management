import React, { ReactNode, useEffect } from "react";
import "./App.css";
import { Login } from "./screens/Login";
import { Register } from "./screens/Registration";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { UserManagement } from "./screens/UserManagement";
import { Home } from "./screens/Home";
import { Signup } from "./screens/Signup";
import { ForgotPass } from "./screens/ForgotPass";
import { ChangePass } from "./screens/ChangePass";
import { UnauthorisedForms } from "./screens/UnauthorisedForms";
import { useAppSelector } from "./app/hooks";
import { AdminHome } from "./screens/AdminHome";
import { selectMainContData } from "./features/mainContainerData";
import { MainContainer } from "./components/MAinContainer";
import { Account } from "./screens/Account";

function App() {
	const mainContainerData = useAppSelector(selectMainContData);

	return (
		<div className="App">
			<div className="App-header">
				<Router>
					<Switch>
						<Route path="/app">
							<UnauthorisedForms>
								<Router>
									<Switch>
										<Route path="/app/login" render={() => <Login />} />
										<Route path="/app/register" render={() => <Signup />} />
										<Route
											path="/app/verifyEmail/*"
											render={() => <Register />}
										/>
										<Route
											path="/app/forgotPassword"
											render={() => <ForgotPass />}
										/>
										<Route
											path="/app/resetPass/*"
											render={() => <ChangePass />}
										/>
										<Route
											path="/app"
											render={() => <Redirect to="/app/login" />}
										/>
									</Switch>
								</Router>
							</UnauthorisedForms>
						</Route>
						<Route path="/home">
							<Home>
								<Router>
									<Switch>
										<Route
											// path="/home"
											path="/home/loggedin"
											render={() => (
												// <Dashboard />
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<UserManagement />}
												/>
											)}
										/>
										<Route
											path="/home/changePassword"
											render={() => (
												<ChangePass />
												// <MainContainer
												// 	backString={mainContainerData.backstring}
												// 	title={mainContainerData.title}
												// 	searchBar={mainContainerData.search}
												// 	content={<ChangePass />}
												// />
											)}
										/>
										<Route
											path="/home/account"
											render={() => (
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<Account />}
												/>
											)}
										/>
										<Route
											path="/home"
											render={() => <Redirect to="/home/loggedin" />}
										/>
									</Switch>
								</Router>
							</Home>
						</Route>
						<Route path="/admin">
							<AdminHome>
								<Router>
									<Switch>
										<Route
											path="/admin/loggedin"
											render={() => (
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<UserManagement admin />}
												/>
											)}
										/>
										<Route
											path="/admin/addUser"
											render={() => (
												<Signup admin />
												// <MainContainer
												// 	backString={mainContainerData.backstring}
												// 	title={mainContainerData.title}
												// 	searchBar={mainContainerData.search}
												// 	content={<Signup admin />}
												// />
											)}
										/>
										<Route
											path="/admin/changePassword"
											render={() => (
												<ChangePass />
												// <MainContainer
												// 	backString={mainContainerData.backstring}
												// 	title={mainContainerData.title}
												// 	searchBar={mainContainerData.search}
												// 	content={<ChangePass />}
												// />
											)}
										/>
										<Route
											path="/admin/account"
											render={() => (
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<Account />}
												/>
											)}
										/>
										<Route
											path="/admin"
											render={() => <Redirect to="/admin/loggedin" />}
										/>
									</Switch>
								</Router>
							</AdminHome>
						</Route>
						<Route path="/" render={() => <Redirect to="/app/login" />} />
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
