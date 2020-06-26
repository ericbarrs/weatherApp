import React from "react";
import { Button, Container, Row, Col, Alert, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { saveProfile } from "../actions/profile";

class Profile extends React.Component {
	state = {
		email: this.props.user.email,
		firstName: this.props.user.firstName,
		lastName: this.props.user.lastName,
		city: this.props.user.city,
		state: this.props.user.state,
		zipcode: this.props.user.zipcode,
		password: "",
		password2: "",
	};

	updateHandler = (e) => {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	};

	isItValid = (property) => {
		try {
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
				<Alert variant="danger" dismissible={true} style={{ marginTop: "5px" }}>
					{this.props.user.errors[field]}
				</Alert>
			)
		);
	}
	render() {
		return (
			<div className="Profile">
				<div className="Register Home">
					<h1 className="heading">Profile</h1>
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
											value={this.state.email}
											isInvalid={this.isItValid("email")}
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>First Name</Form.Label>
										<Form.Control
											type="input"
											placeholder="First Name"
											name="firstName"
											value={this.state.firstName}
											isInvalid={this.isItValid("firstName")}
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Last Name</Form.Label>
										<Form.Control
											type="input"
											placeholder="Last Name"
											name="lastName"
											value={this.state.lastName}
											isInvalid={this.isItValid("lastName")}
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>City</Form.Label>
										<Form.Control
											type="input"
											placeholder="City"
											name="city"
											value={this.state.city}
											isInvalid={this.isItValid("city")}
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>State</Form.Label>
										<Form.Control
											type="input"
											placeholder="State"
											name="state"
											value={this.state.state}
											isInvalid={this.isItValid("state")}
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Zipcode</Form.Label>
										<Form.Control
											type="text"
											maxLength="5"
											placeholder="Zipcode"
											name="zipcode"
											value={this.state.zipcode}
											isInvalid={this.isItValid("zipcode")}
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Form.Group controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Password"
											name="password"
											isInvalid={this.isItValid("password")}
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
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Button
										variant="primary"
										onClick={() => {
											this.props.saveProfile(this.props.user.token, this.state);
										}}
									>
										Save
									</Button>
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};
const ProfileContainer = connect(mapStateToProps, { saveProfile })(Profile);
export default ProfileContainer;
