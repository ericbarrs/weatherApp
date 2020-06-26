import React from "react";
import { Form, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { saveSettings } from "../actions/settings";

class Settings extends React.Component {
	state = {
		settings: {
			low: this.props.user.settings.low,
			high: this.props.user.settings.high,
			get_emails: this.props.user.settings.get_emails,
			weather_conditions: this.props.user.settings.weather_conditions,
		},
	};

	getOptions() {
		const result = [];
		for (let x = 100; x > 50; x--) {
			result.push(<option key={x}>{x}</option>);
		}
		return result;
	}

	checkBoxHandler() {
		this.setState({
			settings: {
				...this.state.settings,
				get_emails: this.state.settings.get_emails === true ? false : true,
			},
		});
	}

	updateHandlerArr(e) {
		this.setState({
			settings: {
				...this.state.settings,
				weather_conditions: [e.target.value],
			},
		});
	}

	validationBeforeSave() {
		if (this.state.settings.high < this.state.settings.low) {
			return this.setState({ error: true });
		} else {
			this.setState({ error: false });
			this.props.saveSettings(this.props.user.token, this.state.settings);
		}
	}

	updateHandler(e) {
		const name = e.target.name;
		this.setState({
			settings: { ...this.state.settings, [name]: e.target.value },
		});
	}

	render() {
		return (
			<div className="Settings">
				<div className="Home">
					<Container fluid="sm">
						<h4>Work Out Temp</h4>
						<Row className="justify-content-md-center">
							<Col xs lg="5">
								<Form>
									<Form.Label>Temperature High</Form.Label>
									<Form.Control
										as="select"
										name="high"
										defaultValue={this.props.user.settings.high}
										isInvalid={this.state.error}
										onChange={(e) => this.updateHandler(e)}
									>
										{this.getOptions()}
									</Form.Control>
									<Form.Label>Temperature Low</Form.Label>
									<Form.Control
										as="select"
										name="low"
										defaultValue={this.props.user.settings.low}
										isInvalid={this.state.error}
										onChange={(e) => this.updateHandler(e)}
									>
										{this.getOptions()}
									</Form.Control>
									{this.state.error && (
										<Alert
											variant="danger"
											onClose={() => this.setState({ error: false })}
											dismissible
											style={{ marginTop: "5px" }}
										>
											The Temperature High can not be bigger the Temperature Low
										</Alert>
									)}
									<Form.Label>Daily Emails</Form.Label>
									<Form.Check
										type="switch"
										id="custom-switch"
										label="Receive Emails"
										name="get_emails"
										defaultChecked={this.props.user.settings.get_emails}
										value={this.state.settings.get_emails}
										onChange={() => this.checkBoxHandler()}
									></Form.Check>
									<Form.Label>Weather conditions</Form.Label>
									<Form.Control
										as="select"
										name="weather_conditions"
										defaultValue={
											this.props.user.settings.weather_conditions[0]
										}
										onChange={(e) => this.updateHandlerArr(e)}
									>
										<option key="0"></option>
										<option key="1">Sunny</option>
										<option key="2">Cloudy</option>
										<option key="3">Rain</option>
										<option key="4">Partly cloudy</option>
										<option key="5">Overcast</option>
									</Form.Control>
									<Button
										variant="primary"
										onClick={() => this.validationBeforeSave()}
									>
										Save
									</Button>
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

const SettingsContainer = connect(mapStateToProps, { saveSettings })(Settings);
export default SettingsContainer;
