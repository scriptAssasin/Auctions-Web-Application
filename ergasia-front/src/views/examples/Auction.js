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

import Maps from './Maps.js'

class AuctionInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: []
        };
    };

    async componentDidMount() {

        // await fetch(process.env.REACT_APP_API_LINK + "/api/auctions/all/", {
        //     method: 'get',
        //     headers: new Headers({
        //         'Authorization': 'Bearer ' + localStorage.getItem('token'),
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);

        //         data.forEach(function (element, index) {
        //             this[index].Buttons =
        //                 <React.Fragment>
        //                     <Button
        //                         color="primary"
        //                         href={"/admin/auctioninfo/" + this[index].Id}
        //                         size="sm"
        //                     >
        //                         Περισσότερα
        //                     </Button>
        //                 </React.Fragment>

        //         }, data);

        //         this.setState({
        //             datas: {
        //                 columns: [
        //                     {
        //                         label: 'Ονομα ▼',
        //                         field: 'Name',
        //                         sort: 'asc',
        //                         width: 100
        //                     },
        //                     {
        //                         label: 'Περιγραφη  ▼',
        //                         field: 'Description',
        //                         sort: 'asc',
        //                         width: 100
        //                     },
        //                     {
        //                         label: 'Τοποθεσια  ▼',
        //                         field: 'Location',
        //                         sort: 'asc',
        //                         width: 100
        //                     },
        //                     {
        //                         label: 'Τιμη  ▼',
        //                         field: 'Currently',
        //                         sort: 'asc',
        //                         width: 100
        //                     },
        //                     {
        //                         label: 'Ενεργειες▼',
        //                         field: 'Buttons',
        //                         sort: 'asc',
        //                         width: 150
        //                     }
        //                 ],
        //                 rows: data
        //             }
        //         })
        //         // this.setState({
        //         //     auctions: data
        //         // })
        //     })
        console.log(this.props.match.params.id)
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
                                            <h3 className="mb-0">Πληροφορίες Δημοπρασίας / Υποβολή Προσφοράς</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                            </Card>
                        </Col>


                        <Col sm='12' className='align-items-center'>
                            <Card style={{ padding: '30px' }}>
                                <Maps />
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
            </>


        );
    };
}

export default AuctionInfo;
