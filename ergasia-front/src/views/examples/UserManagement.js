import React from "react";
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class UserManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      roles: {},
      users: []
    };
  };

  async componentDidMount() {

    await fetch(process.env.REACT_APP_API_LINK + "/api/users/roles/", {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(response => response.json())
      .then(data => {
        data.forEach(element => {
          // console.log(element);
          this.state.roles[element.Id] = element.Role
        });
      })

    await fetch(process.env.REACT_APP_API_LINK + "/api/users/current/", {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        if (this.state.roles[data.UserRole] != 'Administrator') {
          window.location.replace("/admin/index");
        }
      })

    await fetch(process.env.REACT_APP_API_LINK + "/api/users/all/", {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          users: data
        })
      })



  }

  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--8" fluid>
          <Row className="mt-5 align-items-center">




            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow" style={{ marginTop: '-50px', marginBottom: '30px' }}>
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Σελίδα Διαχείρισης Χρηστών</h3>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
            <Container fluid>
              <Card>

                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Ονομα</th>
                      <th>Επωνυμο</th>
                      <th>Ονομα Χρηστη</th>
                      <th>Ρολος</th>
                      <th>Εκκρεμει</th>
                      <th>Ενεργειες</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user, index) => (

                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.Name}</td>
                        <td>{user.Surname}</td>
                        <td>{user.Username}</td>
                        <td>{this.state.roles[user.UserRole]}</td>
                        <td>{user.Pending ? 'ΝΑΙ' : 'ΟΧΙ'}</td>
                        <td><a href={"/admin/user/" + user.Id}><Button color='primary' size='sm'>Περισσότερα</Button></a></td>
                      </tr>

                    ))}
                    {/* <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td colSpan={2}>Larry the Bird</td>
                      <td>@twitter</td>
                    </tr> */}
                  </tbody>
                </Table>
              </Card>
            </Container>





          </Row>
        </Container>
      </>
    );
  };
}

export default UserManagement;
