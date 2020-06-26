import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { userHasToken } from "./actions/actions";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends React.Component {
	componentDidMount() {
		if (this.props.user.token) {
			this.props.userHasToken(this.props.user.token);
		}
	}

	render() {
		if (this.props.user.isAuthenticated) {
			return (
				<div className="App">
					<Router history={history}>
						<Navbar history={history} />
						<Switch>
							<Route exact path="/profile" component={Profile} />
							<Route exact path="/settings" component={Settings} />
							<Route path="/" component={Main} />
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
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		weather: state.weather,
	};
};

const appContainer = connect(mapStateToProps, { userHasToken })(App);
export default appContainer;
