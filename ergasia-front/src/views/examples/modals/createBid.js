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

class CreateBidModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModal: false,
            itemPrice: '',
            itemLocation: [],
            itemCountry: '',
        };
    };


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    handleChange = evt => {
        let value = evt.target.value;
        console.log(value)

        if (evt.target.name == 'itemCategories') {
            value = evt.target.value.split(",")
        }
        this.setState({
            [evt.target.name]: value
        });

    }

    createBid = (evt) => {
        evt.preventDefault();
        let text = "Είστε Σίγουροι; Η διαδικασία είναι μη αναστρέψιμη.";
        if (window.confirm(text) == true) {
            fetch(process.env.REACT_APP_API_LINK + '/api/bids/create/' + this.props.auctionId + '/', {
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
                            Προσθήκη Νέας Προσφοράς
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
                                        <h3 style={{ textAlign: 'center' }}>Υποβολή Προσφοράς</h3>

                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">

                                        <Form role="form">
                                            <Row>
                                                <Col sm='6'>
                                                    <label>Τιμή Προσφοράς</label>
                                                    <Input name='itemPrice' type='text' placeholder='Εισάγετε Τιμή Προσφοράς' onChange={(e) => { this.handleChange(e) }} /> <br />
                                                </Col>
                                                <Col sm='6'>
                                                    <label>Χώρας</label>
                                                    <Input name='itemCountry' type='text' placeholder='Εισάγετε την Χώρα σας' onChange={(e) => { this.handleChange(e) }} /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Τοποθεσία</label>
                                                    <Input name='itemLocation' type='text' placeholder='Εισάγετε την Τοποθεσία σας' onChange={(e) => { this.handleChange(e) }} /> <br />
                                                </Col>
                                                <Col sm='12'>
                                                    <Button color='success' onClick={(e) => { this.createBid(e) }}>Υποβολή</Button>
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

export default CreateBidModal;
