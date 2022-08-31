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
    Input
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1,
    chartExample2,
} from "variables/charts.js";

import { MDBDataTable } from 'mdbreact';

import Header from "components/Headers/Header.js";

import "../../assets/css/datatables.css";

import Maps from './Maps.js'
import CreateBidModal from '../../views/examples/modals/createBid.js'

class AuctionInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            userRole: 'Client',
            roles: {},
        };
    };

    async componentDidMount() {
        await fetch(process.env.REACT_APP_API_LINK + '/api/auctions/byid_details/' + this.props.match.params.id + '/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.Name)
                this.setState({
                    datas: data,
                })
            })

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
                this.setState({
                    userRole: data.UserRole,
                })
                // if (this.state.roles[data.UserRole] == 'Client') {
                //     document.querySelector(".submit-proposal").remove();
                // }

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
                            <Card className="shadow" style={{ marginBottom: '30px' }}>
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Πληροφορίες Δημοπρασίας</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                            </Card>
                        </Col>


                        <Col sm='12' className='align-items-center'>
                            <Card style={{ padding: '30px' }}>
                                <div style={{ marginTop: '100px' }}>

                                    <Maps />
                                </div>
                                <Row className='mt-4'>

                                    {Object.keys(this.state.datas).map((key, index) => {
                                        return (
                                            <Col sm="4">

                                                <span>{key}</span>
                                                <Input type="text" value={this.state.datas[key]} disabled /> <br />
                                            </Col>
                                            // <div key={index}>
                                            //     <h2>{value}</h2>

                                            //     <hr />
                                            // </div>
                                        );
                                    })}
                                </Row>
                                {/* <MDBDataTable
                                    striped
                                    bordered
                                    small
                                    data={this.state.datas}
                                    paginationLabel={['Προηγούμενο', 'Επόμενο']}
                                    infoLabel={['Εμφανίζονται', 'έως', 'από', 'καταχωρήσεις']}
                                    entriesLabel={'Εμφάνιση Αιτημάτων ανά: '}
                                /> */}
                            </Card>
                        </Col>

                    </Row>
                </Container>
                {this.state.roles[this.state.userRole] == 'Bidder' ?
                    <>
                        <Container className="mt-12 submit-proposal" fluid>
                            <Row className="mt-5 align-items-center">



                                <Col className="mb-5 mb-xl-0" xl="12">
                                    <Card className="shadow" style={{ marginBottom: '30px' }}>
                                        <CardHeader className="border-0">
                                            <Row className="align-items-center">
                                                <div className="col">
                                                    <h3 className="mb-0">Υποβολή Προσφοράς</h3>
                                                </div>
                                            </Row>
                                        </CardHeader>
                                    </Card>
                                </Col>


                                <Col sm='12' className='align-items-center'>
                                    <Card style={{ padding: '30px' }}>
                                        <p>Η διαδικασία υποβολής προσφοράς είναι μη αναιρέσιμη</p>
                                        <Col sm='6'>
                                            <CreateBidModal auctionId={this.props.match.params.id} />
                                        </Col>
                                    </Card>
                                </Col>

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

export default AuctionInfo;
