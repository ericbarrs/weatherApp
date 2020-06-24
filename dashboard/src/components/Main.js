import React from "react";

import { Jumbotron, Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchWeather, logOutUser } from "../actions/actions";

class Main extends React.Component {
	state = {
		weather: {},
		date: "",
		city: "",
	};

	componentDidMount() {
		// this.props.fetchWeather(this.props.user.zipcode);
	}

	render() {
		return (
			<div>
				<h1 className="heading">Main</h1>
				<Container>
					<Row className="justify-content-md-center">
						<Col xs lg="6">
							<Jumbotron fluid>
								{}
								<ul>
									{/* <li>{this.props.weather.current.cloudcover}</li> */}
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ul>
							</Jumbotron>
							<Button onClick={() => this.props.logOutUser()}>Log Out</Button>
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
		weather: state.weater,
	};
};

const MainContainer = connect(mapStateToProps, { fetchWeather, logOutUser })(
	Main
);
export default MainContainer;
