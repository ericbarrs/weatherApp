import React from "react";
import { Button, Jumbotron, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default class Register extends React.Component {
	state = {
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		password2: "",
	};

	updateHandler = (e) => {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	};

	render() {
		return (
			<div>
				<h1 className="heading">Register</h1>
				<Container fluid="sm">
					<Row className="justify-content-md-center">
						<Col xs lg="5">
							<Jumbotron>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter email"
										name="email"
										onChange={(e) => this.updateHandler(e)}
									/>
									<Form.Text className="text-muted">
										We'll never share your email with anyone else.
									</Form.Text>
								</Form.Group>
								<Form.Group>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="input"
										placeholder="First Name"
										name="firstName"
										onChange={(e) => this.updateHandler(e)}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type="input"
										placeholder="Last Name"
										name="lastName"
										onChange={(e) => this.updateHandler(e)}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										name="password"
										onChange={(e) => this.updateHandler(e)}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Verify Password</Form.Label>
									<Form.Control
										type="password"
										name="password2"
										placeholder="Verify Password"
										onChange={(e) => this.updateHandler(e)}
									/>
								</Form.Group>
								<Button variant="primary">Register</Button>

								<p id="loginStatement">
									Have an account already <a href="localhost:3000">Login </a>{" "}
									here
								</p>
							</Jumbotron>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
