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
        defaultModal: false
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
                            size="sm"
                            isOpen={this.state.formModal}
                            toggle={() => this.toggleModal("formModal")}
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">
                                    <CardHeader className="bg-transparent pb-5">
                                        <h3 style={{textAlign: 'center'}}>Προσθήκη Δημοπρασίας</h3>
                                        
                                    </CardHeader>
                                    <CardBody className="px-lg-5 py-lg-5">
                                       
                                        <Form role="form">
                                            
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
