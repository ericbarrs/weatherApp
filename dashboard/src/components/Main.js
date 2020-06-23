import React from "react";
// import env from "../env";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";

export default class Main extends React.Component {
  state = {
    weather: {},
    date: "",
    city: "",
  };

  // async componentDidMount() {
  //   const url = `http://api.weatherstack.com/forecast?access_key=${
  //     process.env.ACCESS_KEY || env.access_key
  //   }&query=${this.state.city || "78613"}`;
  //   let dateObj = new Date();
  //   let month = dateObj.getUTCMonth() + 1; //months from 1-12
  //   let day = dateObj.getUTCDate();
  //   let year = dateObj.getUTCFullYear();

  //   const newdate = year + "-" + month + "-" + day;

  //   const result = await fetch(url);

  //   const weather = await result.json();

  //   this.setState({ weather, date: newdate });
  // }

  render() {
    return (
      <div>
        <h1 className="heading">Main</h1>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="6">
              <Jumbotron>testing</Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
