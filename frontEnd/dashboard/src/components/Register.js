import React from "react";
import { Button, Container, Row, Col, Alert, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { registerUser, dismissAlert } from "../actions/register";
import { Link } from "react-router-dom";

class Register extends React.Component {
	state = {
		email: "",
		firstName: "",
		lastName: "",
		city: "",
		state: "",
		zipcode: "",
		password: "",
		password2: "",
	};

	updateHandler = (e) => {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	};

	enterPress(e) {
		if (e.charCode === 13) {
			e.preventDefault();
			this.props.loginUser(this.state);
		}
	}

	isItValid = (property) => {
		try {
			console.log(this.props.user.errors.errors);
			if (this.props.user.errors[property]) {
				return true;
			} else {
				return false;
			}
		} catch {}
	};

	AlertMessage(field) {
		return (
			this.isItValid(field) && (
				<Alert variant="danger" style={{ marginTop: "5px" }}>
					{this.props.user.errors[field]}
				</Alert>
			)
		);
	}

	render() {
		return (
			<div className="Register Home">
				<h1 className="heading">Register</h1>
				<Container fluid="sm">
					<Row className="justify-content-md-center">
						<Col xs lg="5">
							<Form>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										name="email"
										isInvalid={this.isItValid("email")}
										onChange={(e) => this.updateHandler(e)}
										onKeyPress={(e) => {
											if (e.charCode === 13) e.preventDefault();
										}}
									/>

									<Form.Text className="text-info">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>
								<Form.Group>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="input"
										placeholder="First Name"
										name="firstName"
										isInvalid={this.isItValid("firstName")}
										onChange={(e) => this.updateHandler(e)}
										onKeyPress={(e) => {
											if (e.charCode === 13) e.preventDefault();
										}}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="input"
										placeholder="Last Name"
										name="lastName"
										isInvalid={this.isItValid("lastName")}
										onChange={(e) => this.updateHandler(e)}
										onKeyPress={(e) => {
											if (e.charCode === 13) e.preventDefault();
										}}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>City</Form.Label>
									<Form.Control
										type="input"
										placeholder="City"
										name="city"
										isInvalid={this.isItValid("city")}
										onChange={(e) => this.updateHandler(e)}
										onKeyPress={(e) => {
											if (e.charCode === 13) e.preventDefault();
										}}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>State</Form.Label>
									<Form.Control
										type="input"
										placeholder="State"
										name="state"
										isInvalid={this.isItValid("state")}
										onChange={(e) => this.updateHandler(e)}
										onKeyPress={(e) => {
											if (e.charCode === 13) e.preventDefault();
										}}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Zipcode</Form.Label>
									<Form.Control
										type="text"
										maxLength="5"
										placeholder="Zipcode"
										name="zipcode"
										isInvalid={this.isItValid("zipcode")}
										onChange={(e) => this.updateHandler(e)}
										onKeyPress={(e) => {
											if (e.charCode === 13) e.preventDefault();
										}}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										name="password"
										isInvalid={this.isItValid("password")}
										onKeyPress={(event) => {
											this.enterPress(event);
										}}
										onChange={(e) => this.updateHandler(e)}
									/>
								</Form.Group>
								<Form.Group controlId="verifyPassword">
									<Form.Label>Verify Password</Form.Label>
									<Form.Control
										type="password"
										name="password2"
										placeholder="Verify Password"
										isInvalid={this.isItValid("password")}
										onKeyPress={(event) => {
											this.enterPress(event);
										}}
										onChange={(e) => this.updateHandler(e)}
									/>
								</Form.Group>
								<Button
									variant="primary"
									onClick={() => {
										this.props.registerUser(this.state);
									}}
								>
									Register
								</Button>

								<p id="loginStatement">
									Have an account already <Link to="/">Login</Link> here
								</p>
							</Form>
						</Col>
					</Row>
				</Container>
				<div className="error">
					{this.AlertMessage("email")}
					{this.AlertMessage("firstName")}
					{this.AlertMessage("lastName")}
					{this.AlertMessage("city")}
					{this.AlertMessage("state")}
					{this.AlertMessage("zipcode")}
					{this.AlertMessage("password")}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const RegisterContainer = connect(mapStateToProps, {
	registerUser,
	dismissAlert,
})(Register);
export default RegisterContainer;
