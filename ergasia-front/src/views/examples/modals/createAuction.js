import React from "react";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    Row,
    Col
} from "reactstrap";

class CreateAuctionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModal: false,
            itemName: '',
            itemCategories: [],
            buyPrice: '',
            firstBid: '',
            itemDescription: '',
            auctionEndDate: ''
        };
    };


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    handleChange = evt => {
        let value = evt.target.value;

        if (evt.target.name == 'itemCategories') {
            value = evt.target.value.split(",")
        }
        this.setState({
            [evt.target.name]: value
        });

    }

    createAuction = (evt) => {
        evt.preventDefault();
        fetch(process.env.REACT_APP_API_LINK + '/api/auctions/create/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(data => {
                window.location.reload();
            })
    }

    render() {
        return (
            <>
                <Row>

                    <Col md="4">
                        <Button
                            // block
                            color="primary"
                            type="button"
                            onClick={() => this.toggleModal("formModal")}
                        >
                            Προσθήκη Νέας Δημοπρασίας
                        </Button>

                        <Modal
                            className="modal-dialog-centered"
                            size="lg"
                            isOpen={this.state.formModal}
                            toggle={() => this.toggleModal("formModal")}
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent pb-5">
                                        <h3 style={{ textAlign: 'center' }}>Προσθήκη Δημοπρασίας</h3>

                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">

                                        <Form role="form">
                                            <Row>
                                                <Col sm='6'>
                                                    <label>Όνομα προιόντος</label>
                                                    <Input name='itemName' type='text' placeholder='Εισάγετε Όνομα Προιόντος' onChange={(e) => { this.handleChange(e) }} /> <br />
                                                </Col>
                                                <Col sm='6'>
                                                    <label>Κατηγορία προιόντος (Πολλαπλές κατηγορίες διαχωρίζονται με , )</label>
                                                    <Input name='itemCategories' type='text' placeholder='Εισάγετε Κατηγορίες Προιόντος' onChange={(e) => { this.handleChange(e) }} /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Τιμή άμεσης αγοράς</label>
                                                    <Input name='buyPrice' type='text' placeholder='Εισάγετε Τιμή Άμεσης Αγοράς' onChange={(e) => { this.handleChange(e) }} /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Ελάχιστο μέγεθος πρώτης προσφοράς</label>
                                                    <Input name='firstBid' type='text' placeholder='Εισάγετε Ελάχιστο μέγεθος πρώτης προσφοράς' onChange={(e) => { this.handleChange(e) }} /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Περιγραφή Προιόντος</label>
                                                    <Input name='itemDescription' type='text' placeholder='Εισάγετε Περιγραφή Προιόντος' onChange={(e) => { this.handleChange(e) }} /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Ημερομηνία Λήξης Δημοπρασίας</label>
                                                    <Input name='auctionEndDate' type='text' placeholder='Εισάγετε Ημερομηνία Λήξης Δημοπρασίας' onChange={(e) => { this.handleChange(e) }} /> <br />

                                                </Col>
                                                <Col sm='12'>
                                                    <Button color='success' onClick={(e) => { this.createAuction(e) }}>Υποβολή</Button>
                                                </Col>
                                            </Row>




                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Modal>
                    </Col>
                </Row>
            </>
        );
    }
}

export default CreateAuctionModal;
