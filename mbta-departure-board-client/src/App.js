import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromMBTA", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    const Panel = require('react-bootstrap/lib/Panel');
    const Table = require('react-bootstrap/lib/Table');
    const ProgressBar = require('react-bootstrap/lib/ProgressBar');
    const moment = require('moment')

    let departures = [];
    if (response) {
      departures = response.map((trip)=>
        <tr>
          <td>{trip.Origin}</td>
          <td>{moment.unix(trip.ScheduledTime).format('h:mm A')}</td>
          <td>{trip.Destination}</td>
          <td>{trip.Trip}</td>
          <td>{trip.Track}</td>
          <td>{trip.Status}</td>
        </tr>
      );
    } else {
      departures =  (
        <tr>
          <td colSpan="7">
          <h6>LOADING...</h6>
            <ProgressBar active bsStyle="warning" now={66} />
          </td>
        </tr>
      );
    }
    return (
      <div>
        <Panel bsStyle="primary">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Departures - {moment()
              .format("dddd MM-DD-YYYY - h:mm A")}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Table striped bordered condensed hover>
              <thead>
                <th>DEPARTING</th>
                <th>TIME</th>
                <th>DESTINATION</th>
                <th>TRAIN NO.</th>
                <th>TRACK NO.</th>
                <th>STATUS</th>
              </thead>
              <tbody>
                { departures }
              </tbody>
            </Table>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
export default App;
