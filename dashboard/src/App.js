import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Main from "./components/Main";
import Settings from "./components/Settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

function App() {
	if (localStorage.getItem("token")) {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/settings">
							<Settings />
						</Route>
						<Route path="/">
							<Main />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const appContainer = connect(mapStateToProps, {})(App);
export default appContainer;
