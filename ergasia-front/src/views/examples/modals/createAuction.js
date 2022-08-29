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
    state = {
        defaultModal: false,
        itemName: '',
        itemCategories: '',
        
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
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
                                                    <Input type='text' placeholder='Εισάγετε Όνομα Προιόντος' /> <br />
                                                </Col>
                                                <Col sm='6'>
                                                    <label>Κατηγορία προιόντος (Πολλαπλές κατηγορίες διαχωρίζονται με , )</label>
                                                    <Input type='text' placeholder='Εισάγετε Κατηγορίες Προιόντος' /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Τιμή άμεσης αγοράς</label>
                                                    <Input type='text' placeholder='Εισάγετε Τιμή Άμεσης Αγοράς' /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Ελάχιστο μέγεθος πρώτης προσφοράς</label>
                                                    <Input type='text' placeholder='Εισάγετε Ελάχιστο μέγεθος πρώτης προσφοράς' /> <br />

                                                </Col>
                                                <Col sm='6'>
                                                    <label>Περιγραφή Προιόντος</label>
                                                    <Input type='text' placeholder='Εισάγετε Περιγραφή Προιόντος' /> <br />

                                                </Col>
                                                <Col sm='12'>

                                                    <Button color='success'>Υποβολή</Button>
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
