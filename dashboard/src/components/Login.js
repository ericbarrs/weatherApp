import React from "react";
import { Button, Jumbotron, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { loginUser } from "../actions/actions";
import { Link } from "react-router-dom";

class Login extends React.Component {
	state = {
		email: "",
		password: "",
	};

	updateHandler = (e) => {
		const name = e.target.name;
		this.setState({ [name]: e.target.value });
	};

	render() {
		return (
			<div>
				<h1 className="heading">Login</h1>
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
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										name="password"
										onChange={(e) => this.updateHandler(e)}
									/>
								</Form.Group>
								<Button
									variant="primary"
									type="submit"
									onClick={() => this.props.loginUser(this.state)}
								>
									Login
								</Button>

								<p id="loginStatement">
									Don't have an account <Link to="/register">Register</Link>{" "}
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

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const LoginContainer = connect(mapStateToProps, { loginUser })(Login);
export default LoginContainer;
