import React from "react";
import { Button, Jumbotron, Container, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { registerUser } from "../actions/register";

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
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="City"
                    name="city"
                    onChange={(e) => this.updateHandler(e)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="State"
                    name="state"
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
                <Button
                  variant="primary"
                  onClick={() => this.props.registerUser(this.state)}
                >
                  Register
                </Button>

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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const RegisterContainer = connect(mapStateToProps, { registerUser })(Register);
export default RegisterContainer;
