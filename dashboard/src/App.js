import React from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Main from "./components/Main";
import Settings from "./components/Settings";

function App() {
	return (
		<div className="App">
			<Register />
			<Login />
			<Main />
			<Settings />
		</div>
	);
}

export default App;
