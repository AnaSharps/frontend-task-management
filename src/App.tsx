import React, { ReactNode, useEffect } from "react";
import "antd/dist/antd.css";
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
import { Dashboard } from "./screens/Dashboard";
import { TaskManagement } from "./screens/TaskMAnagement";
import Pusher from "pusher-js";
import * as PusherTypes from "pusher-js";
import { message, Spin } from "antd";
import { selectStatus } from "./features/loading";
import { LoadingOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

function App() {
	const mainContainerData = useAppSelector(selectMainContData);
	const status = useAppSelector(selectStatus);
	// const status = "processing";

	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

	useEffect(() => {
		const pusher = new Pusher(
			process.env.REACT_APP_PUSHER_APP_KEY
				? process.env.REACT_APP_PUSHER_APP_KEY
				: "",
			{
				cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
			}
		);

		const channel = pusher.subscribe("my-channel");

		channel.bind("NotificationEvent", (data: any) => {
			if (data.success) message.success(data.message);
			else if (!data.success) message.error(data.message);
		});
	}, []);

	return (
		<div className="App">
			{status === "processing" && (
				<div className="App-Loading">
					<Spin indicator={antIcon} />
				</div>
			)}
			<div
				className="App-header"
				style={{ opacity: status === "processing" ? 0.6 : 1 }}
			>
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
											path="/home/dashboard"
											render={() => (
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<Dashboard />}
												/>
											)}
										/>
										<Route
											path="/home/tasks"
											render={() => (
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<TaskManagement />}
												/>
											)}
										/>
										<Route
											path="/home/users"
											render={() => (
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
											render={() => <ChangePass />}
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
											render={() => <Redirect to="/home/dashboard" />}
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
											path="/admin/dashboard"
											render={() => (
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<Dashboard />}
												/>
											)}
										/>
										<Route
											path="/admin/tasks"
											render={() => (
												<MainContainer
													backString={mainContainerData.backstring}
													title={mainContainerData.title}
													searchBar={mainContainerData.search}
													content={<TaskManagement />}
												/>
											)}
										/>
										<Route
											path="/admin/users"
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
											render={() => <Signup admin />}
										/>
										<Route
											path="/admin/changePassword"
											render={() => <ChangePass />}
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
											render={() => <Redirect to="/admin/dashboard" />}
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
