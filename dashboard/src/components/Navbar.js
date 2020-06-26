import React from "react";

import {
	Nav,
	Navbar,
	// NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { logOutUser, fetchWeather } from "../actions/actions";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
	state = {
		redirect: false,
	};

	updateHandler(e) {
		e.preventDefault();
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	}

	updateZipcode(zipcode) {
		this.props.fetchWeather(this.props.user.token, zipcode);
	}
	render() {
		return (
			<Navbar bg="dark" expand="lg">
				<Navbar.Brand as={Link} to="/">
					WeatherApp
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} to="/profile">
							Profile
						</Nav.Link>
						<Nav.Link as={Link} to="/settings">
							Settings
						</Nav.Link>
					</Nav>
					<Form validated={false} inline>
						<Form.Text className="NavBar-text">
							Search a different area
						</Form.Text>
						<FormControl
							placeholder="Enter Zipcode"
							className="mr-sm-2"
							name="zipcode"
							onChange={(e) => this.updateHandler(e)}
							onKeyPress={(e) => {
								if (e.charCode === 13) e.preventDefault();
							}}
						/>
						<Nav.Link
							type="button"
							as={Link}
							className="mr-sm-2 search-navbar btn btn-outline-success"
							to="/"
							onClick={(e) => this.updateZipcode(this.state.zipcode)}
						>
							Search
						</Nav.Link>
						<Button
							className="mr-sm-2"
							variant="outline-danger"
							onClick={() => this.props.logOutUser()}
						>
							Log Out
						</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		weather: state.weather,
	};
};

const NavbarContainer = connect(mapStateToProps, { logOutUser, fetchWeather })(
	Navigation
);
export default NavbarContainer;
