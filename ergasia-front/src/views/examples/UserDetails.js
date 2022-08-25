import React from "react";
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts

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
    Input
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: []
        };
    };

    async componentDidMount() {
        await fetch(process.env.REACT_APP_API_LINK + "/api/users/current_details/" + this.props.match.params.id + "/", {
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
                    userInfo: data
                })
            })



    }

    approveUser = () => {
        const userId = this.props.match.params.id;

        fetch(process.env.REACT_APP_API_LINK + '/api/users/approve/' + userId + "/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                window.location.reload();
            })
    }

    render() {
        return (
            <>
                <Header />
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
                            <Card style={{ padding: '20px' }}>
                                <Row>

                                    {Object.keys(this.state.userInfo).map((key, index) => {
                                        return (
                                            <Col sm="4">

                                                <span>{key}</span>
                                                <Input type="text" value={this.state.userInfo[key]} disabled /> <br />
                                            </Col>
                                            // <div key={index}>
                                            //     <h2>{value}</h2>

                                            //     <hr />
                                            // </div>
                                        );
                                    })}
                                    {this.state.userInfo['Εκκρεμεί'] ?
                                        <>
                                            <Button style={{ margin: '20px' }} color='primary' onClick={ () => { this.approveUser() } }>Έγκριση Χρήστη</Button>
                                        </>
                                        :
                                        <></>}

                                </Row>

                            </Card>
                        </Container>





                    </Row>
                </Container>

            </>
        )
    }
}

export default UserDetails