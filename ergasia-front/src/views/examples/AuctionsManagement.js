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

import CreateAuctionModal from "../examples/modals/createAuction.js";

class AuctionsManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  };

  async componentDidMount() {




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
                      <h3 className="mb-0">Σελίδα Διαχείρισης Δημοπρασιών</h3>
                    </div>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
            <Container fluid>
              <Card style={{ padding: '20px' }}>
                <Row>
                  <Col>
                    <CreateAuctionModal />
                  </Col>
                </Row> <br />
                <h2 style={{ textAlign: 'center' }}>Ενεργές Δημοπρασίες</h2> <br />
                <Row>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                                {/* <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1000x900.jpg").default}
                      top
                    /> */}
                      <CardBody>
                        <CardTitle>Δημοπρασία 1</CardTitle>
                        <CardText>
                          Δοκιμαστικό Κείμενο
                        </CardText>
                        <Row>

                          <Col sm='5'>

                            <Button
                              color="warning"
                              size='sm'

                            >
                              Επεξεργασία
                            </Button>
                          </Col>
                          <Col sm='5'>
                            <Button
                              color="info"
                              size='sm'

                            >
                              Προσφορές
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                                {/* <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1000x900.jpg").default}
                      top
                    /> */}
                      <CardBody>
                        <CardTitle>Δημοπρασία 2</CardTitle>
                        <CardText>
                          Δοκιμαστικό Κείμενο
                        </CardText>
                        <Row>

                          <Col sm='5'>

                            <Button
                              color="warning"
                              size='sm'

                            >
                              Επεξεργασία
                            </Button>
                          </Col>
                          <Col sm='5'>
                            <Button
                              color="info"
                              size='sm'

                            >
                              Προσφορές
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                                {/* <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1000x900.jpg").default}
                      top
                    /> */}
                      <CardBody>
                        <CardTitle>Δημοπρασία 3</CardTitle>
                        <CardText>
                          Δοκιμαστικό Κείμενο
                        </CardText>
                        <Row>

                          <Col sm='5'>

                            <Button
                              color="warning"
                              size='sm'

                            >
                              Επεξεργασία
                            </Button>
                          </Col>
                          <Col sm='5'>
                            <Button
                              color="info"
                              size='sm'

                            >
                              Προσφορές
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "18rem" }}>
                                {/* <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1000x900.jpg").default}
                      top
                    /> */}
                      <CardBody>
                        <CardTitle>Δημοπρασία 4</CardTitle>
                        <CardText>
                          Δοκιμαστικό Κείμενο
                        </CardText>
                        <Row>

                          <Col sm='5'>

                            <Button
                              color="warning"
                              size='sm'

                            >
                              Επεξεργασία
                            </Button>
                          </Col>
                          <Col sm='5'>
                            <Button
                              color="info"
                              size='sm'

                            >
                              Προσφορές
                            </Button>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Container>





          </Row>
        </Container>
      </>
    );
  };
}

export default AuctionsManagement;
