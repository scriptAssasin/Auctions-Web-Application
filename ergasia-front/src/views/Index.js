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

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userRole: [],
      pending: false,
      roles: {},
      loading: false
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
          console.log(element);
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
        console.log(data);
        if (this.state.roles[data.UserRole] == 'Administrator') {
          window.location.replace("/admin/users");
        }
        if (data.Pending) {
          document.querySelector("#sidenav-main").remove();
        }
        this.setState({
          pending: data.Pending,
          loading: true,
          userRole: data.UserRole
        });
      })



  }

  render() {
    
    return (
      <>
        {this.state.loading && this.state.userRole != 'Administrator'  ?
          <>
            <Header />
            {/* Page content */}
            <Container className="mt--8" fluid>
              <Row className="mt-5 align-items-center">


                {this.state.pending ?
                  <>

                    <Col className="mb-5 mb-xl-0" xl="12" style={{ marginTop: '50px' }}>
                      <Card className="shadow" style={{ marginTop: '-50px', marginBottom: '30px' }}>
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0">Θα θέλαμε να σας ενημερώσουμε πως εκκρεμεί η έγκριση της αίτησης εγγραφής σας από τον Διαχειριστή. Σας ευχαριστούμε για την κατανόηση!</h3>
                            </div>
                          </Row>
                        </CardHeader>
                      </Card>
                    </Col>
                  </>
                  :
                  <>
                    <Col className="mb-5 mb-xl-0" xl="12">
                      <Card className="shadow" style={{ marginTop: '-50px', marginBottom: '30px' }}>
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0">Αρχική Σελίδα</h3>
                            </div>
                          </Row>
                        </CardHeader>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card style={{ width: "18rem" }}>
                        {/* <CardImg
            alt="..."
            src={require("assets/img/theme/img-1-1000x900.jpg").default}
            top
          /> */}
                        <CardBody>
                          <CardTitle>Πλοήγηση/Αναζήτηση Δημοπρασιών</CardTitle>
                          <CardText>
                            Μεταβαίνοντας στην σελίδα αυτή, σας δίνεται η δυνατότητα να πλοηγηθείτε στις διαθέσιμες δημοπρασίες που υπάρχουν στην εφαρμογή
                          </CardText>
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Μετάβαση
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card style={{ width: "18rem" }}>
                        {/* <CardImg
            alt="..."
            src={require("assets/img/theme/img-1-1000x900.jpg").default}
            top
          /> */}
                        <CardBody>
                          <CardTitle>Προτεινόμενες Δημοπρασίες</CardTitle>
                          <CardText>
                            Μεταβαίνοντας στην σελίδα αυτή, σας δίνεται η δυνατότητα να πλοηγηθείτε στις προτεινόμενες από την εφαρμογή προτεινόμενες δημοπρασίες ειδικά για εσάς!
                          </CardText>
                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Μετάβαση
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="3">
                      <Card style={{ width: "18rem" }}>
                        {/* <CardImg
            alt="..."
            src={require("assets/img/theme/img-1-1000x900.jpg").default}
            top
          /> */}
                        <CardBody>
                          <CardTitle>Διαχείριση Δημοπρασιών</CardTitle>
                          <CardText>
                            Μεταβαίνοντας στην σελίδα αυτή, σας δίνεται η δυνατότητα να διαχειριστείτε τις δημοπρασίες σας.
                          </CardText>
                          <Button
                            color="primary"
                            href="/admin/auctionsmanagement"
                            
                          >
                            Μετάβαση
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </>
                }


              </Row>
            </Container>
          </>
          :
          <>
          </>
        }

      </>
    );
  };
}

export default Index;
