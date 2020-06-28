import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
// import { } from "../actions/actions";
import { tempConverter } from "../utils.js/tempConverter";

class Main extends React.Component {
	state = {
		weather: {},
		date: "",
		city: "",
	};

	componentDidMount() {}

	weatherIcons(icon, ind) {
		return (
			<li className="IconImage" key={ind}>
				<img src={icon} alt="" />
			</li>
		);
	}

	shouldYouExercise() {
		const { temperature, weather_descriptions } = this.props.weather.current;
		const { settings } = this.props.user;

		if (
			tempConverter(temperature) < settings.high &&
			tempConverter(temperature) > settings.low
		) {
			return <h4>Temperature is within your optimal workout range</h4>;
		} else if (weather_descriptions[0] === settings.weather_conditions[0]) {
			return (
				<h4>Temperature isn't within your range but the weather is nice</h4>
			);
		} else {
			return <h4>Not a good time to exercise</h4>;
		}
	}

	render() {
		if (!this.props.weather.current) {
			return null;
		}
		return (
			<div className="Main">
				<Container>
					<Row className="justify-content-md-center">
						<Col xs lg="6">
							<h3 id="greeting">Hello {this.props.user.firstName}</h3>
							<div className="display">
								<div className="MainHeader">
									<div>
										<h1>
											{this.props.weather.location.name}
											{","}
											{this.props.weather.location.region}
										</h1>
									</div>
									<div>
										{this.props.weather.current.weather_icons.map(
											(icon, ind) => {
												return this.weatherIcons(icon, ind);
											}
										)}
									</div>
								</div>
								<h2>
									{tempConverter(this.props.weather.current.temperature)}
									<>&#8457;</>
								</h2>
								<ul>
									<li className="weatherConditions">
										Weather Descriptions:{" "}
										{this.props.weather.current.weather_descriptions.map(
											(cond, ind) => {
												if (
													this.props.weather.current.weather_descriptions
														.length -
														1 !==
													ind
												) {
													return `${cond}, `;
												} else {
													return `${cond}. `;
												}
											}
										)}
									</li>
									<hr />
									<h5>
										High Today of:{" "}
										{tempConverter(this.props.weather.forecast.maxtemp) ||
											"No Data at this time"}
										<>&#8457;</>
									</h5>
									<h5>
										{" "}
										Low Today of:{" "}
										{tempConverter(this.props.weather.forecast.mintemp) ||
											"No Data at this time"}
										<>&#8457;</>
									</h5>
									<hr />
									<li>Cloudcover: {this.props.weather.current.cloudcover}</li>
									<li>Humidity: {this.props.weather.current.humidity}</li>

									<li>
										Sunrise:{" "}
										{this.props.weather.forecast.astro.sunrise ||
											"No Data at this time"}
									</li>
									<li>
										Sunset:{" "}
										{this.props.weather.forecast.astro.sunset ||
											"No Data at this time"}
									</li>
									<li>
										Moonrise:{" "}
										{this.props.weather.forecast.astro.moonrise ||
											"No Data at this time"}
									</li>
									<li>
										Moonset:{" "}
										{this.props.weather.forecast.astro.moonset ||
											"No Data at this time"}
									</li>
									<li>
										Moon Phase:{" "}
										{this.props.weather.forecast.astro.moon_phase ||
											"No Data at this time"}
									</li>
									<li>
										Moon Illumination:{" "}
										{this.props.weather.forecast.astro.moon_illumination ||
											"No Data at this time"}
									</li>
								</ul>
							</div>
						</Col>
					</Row>
				</Container>
				{this.shouldYouExercise()}
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

const MainContainer = connect(mapStateToProps, {})(Main);
export default MainContainer;
