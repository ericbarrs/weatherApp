import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
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

	enterPress(e) {
		if (e.charCode === 13) {
			e.preventDefault();
			this.props.loginUser(this.state);
		}
	}

	render() {
		return (
			<div className="Login">
				<div className="Home">
					<h1 className="heading">Login</h1>
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
											onKeyPress={(e) => {
												if (e.charCode === 13) e.preventDefault();
											}}
											onChange={(e) => this.updateHandler(e)}
										/>
										<Form.Text className="text-info">
											We'll never share your email with anyone else.
										</Form.Text>
									</Form.Group>
									<Form.Group controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Password"
											name="password"
											onKeyPress={(event) => {
												this.enterPress(event);
											}}
											onChange={(e) => this.updateHandler(e)}
										/>
									</Form.Group>
									<Button
										variant="primary"
										onKeyPress={(e) => {
											this.enterPress(e);
										}}
										onClick={() => this.props.loginUser(this.state)}
									>
										Login
									</Button>

									<p id="loginStatement">
										Don't have an account <Link to="/register">Register</Link>{" "}
										here
									</p>
								</Form>
							</Col>
						</Row>
					</Container>
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

const LoginContainer = connect(mapStateToProps, { loginUser })(Login);
export default LoginContainer;
