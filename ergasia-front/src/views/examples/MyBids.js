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

import { MDBDataTable } from 'mdbreact';

import Header from "components/Headers/Header.js";

import "../../assets/css/datatables.css";

class MyBids extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: []
        };
    };

    async componentDidMount() {

        await fetch(process.env.REACT_APP_API_LINK + "/api/bids/allbyuserid/", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                data.forEach(function (element, index) {
                    this[index].Time = this[index].Time.split('T')[0] + ' ' + this[index].Time.split('T')[1].split('.')[0]
                    this[index].Buttons = 
                    <React.Fragment>
                        <Button 
                        color='info'
                        size='sm'
                        >
                            Επικοινωνία Με Πωλητή
                        </Button>
                    </React.Fragment>
                }, data);

                this.setState({
                    datas: {
                        columns: [
                            {
                                label: 'Ονομα ▼',
                                field: 'Name',
                                sort: 'asc',
                                width: 100
                            },
                            {
                                label: 'Τιμη  ▼',
                                field: 'Amount',
                                sort: 'asc',
                                width: 100
                            },
                            {
                                label: 'Διευθυνση  ▼',
                                field: 'Location',
                                sort: 'asc',
                                width: 100
                            },
                            {
                                label: 'Χωρα  ▼',
                                field: 'Country',
                                sort: 'asc',
                                width: 100
                            },
                            {
                                label: 'Ημερομηνια ▼',
                                field: 'Time',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'Ενεργειες ▼',
                                field: 'Buttons',
                                sort: 'asc',
                                width: 150
                            },

                        ],
                        rows: data
                    }
                })
                // this.setState({
                //     auctions: data
                // })
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
                                            <h3 className="mb-0">Πλοήγηση / Αναζήτηση Δημοπρασιών</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                            </Card>
                        </Col>


                        <Col sm='12' className='align-items-center'>
                            <Card style={{ padding: '30px' }}>

                                <MDBDataTable
                                    striped
                                    bordered
                                    small
                                    data={this.state.datas}
                                    paginationLabel={['Προηγούμενο', 'Επόμενο']}
                                    infoLabel={['Εμφανίζονται', 'έως', 'από', 'καταχωρήσεις']}
                                    entriesLabel={'Εμφάνιση Αιτημάτων ανά: '}
                                    responsive
                                />
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </>


        );
    };
}

export default MyBids;
