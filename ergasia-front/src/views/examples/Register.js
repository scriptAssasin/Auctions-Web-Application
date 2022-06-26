
import React, { useState } from "react";
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
  Row,
  Col,
} from "reactstrap";

function setToken(userToken) {
  localStorage.setItem('token', userToken);
}

async function loginUser(credentials) {
  console.log(JSON.stringify(credentials));
  return fetch(process.env.REACT_APP_API_LINK + '/api/users/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      data.json()
      .then(res => {
        if(res.access_token){
          setToken(String(res.access_token));          
          
          window.location.replace("/admin/index");
        }
      })
    })
}

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({});

  const ValidatePass = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPasswordValidation(values => ({ ...values, [name]: value }))
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let Username = inputs['Username'];
    let password = inputs['Password'];
    
    if (Object.keys(inputs).length < 8) {
      alert('Παρακαλούμε συμπληρώστε όλα τα πεδία');
    }
    else {
      if (inputs['Password'] != passwordValidation['PasswordValidation']) {
        alert('Οι κωδικοί δεν ταυτίζονται!');
      }
      else {
        fetch(process.env.REACT_APP_API_LINK + "/api/users/register/", {
          method: 'post',
          headers: new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(inputs)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if(data == -1)
              alert('Το username που συμπληρώσατε είναι ήδη χρησιμοποιημένο!');
            else {

              const auth = loginUser({
                Username,
                password
              });
            }
          })
      }
    }



    console.log(inputs, inputs['Password']);
    console.log(passwordValidation['PasswordValidation']);


  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h4>Δημιουργία νέου χρήστη</h4>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Όνομα Χρήστη" name="Username" type="text" onChange={handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Όνομα" name="Name" type="text" onChange={handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Επώνυμο" name="Surname" type="text" onChange={handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    name="Email"
                    autoComplete="new-email"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-location-arrow" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Διεύθυνση / Γεωγραφική Τοποθεσία"
                    type="text"
                    name="Address"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-phone" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Αριθμός Τηλεφώνου"
                    type="number"
                    name="Phone"
                    onChange={handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-address-card" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="ΑΦΜ"
                    type="number"
                    name="Afm"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Κωδικός Πρόσβασης"
                    type="password"
                    autoComplete="new-password"
                    name="Password"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Επιβεβαίωση Κωδικού Πρόσβασης"
                    type="password"
                    name="PasswordValidation"
                    onChange={ValidatePass}
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Εγγραφή
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
