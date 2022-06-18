
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
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

async function loginUser(credentials) {
  return fetch(process.env.REACT_APP_API_LINK + '/api/users/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

async function verifyToken(token) {
  await fetch(process.env.REACT_APP_API_LINK + "/api/users/current/", {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
    .then(
      (result) => {
        console.log(result.status);
        if (result.status == 401) {
          localStorage.removeItem('token');
          window.location.replace("/auth/login");
        }
        else {
          localStorage.setItem('token', token);

        }
      },

    )
};


export default function Login({ setToken }) {
  const [Username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [erroremail, setErrorEmail] = useState(false);
  const [errorpass, setErrorPass] = useState(false);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      verifyToken(token);
      window.location.replace("/admin/index");
    }
  });

  const handleSubmit = async e => {
    console.log(process.env.REACT_APP_API_LINK);
    console.log(Username);
    console.log(password);
    e.preventDefault();
    const auth = await loginUser({
      Username,
      password
    });

    if (auth.detail == "Incorrect username or password") {
      // // console.log("Incorrect email and/or password");
      setErrorEmail(true);
    }
    // The below does not work

    if (auth.errors) {
      setErrorEmail(false);
      setErrorPass(false);
      if (auth.errors == 'Email not exists') {
        alert('caught wrong email');
        setErrorEmail(true);
        localStorage.removeItem('token');
        // window.location.replace("/");
      }
      if (auth.errors == 'Password Incorrect') {
        alert('caught wrong pass');
        setErrorPass(true);
        localStorage.removeItem('token');
        // window.location.replace("/");
      }
    };
    if (auth.access_token) {
      setToken(String(auth.access_token));
      // // console.log(auth.access_token);


      window.location.replace("/admin/index");
    };

  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h5>Συμπληρώστε όνομα χρήστη και κωδικό πρόσβασης</h5>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="username"
                    type="text"
                    autoComplete="new-email"
                    onChange={e => setUsername(e.target.value)}
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
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {erroremail ? <p style={{ color: 'orange' }}>To email ή ο κωδικός πρόσβασης είναι λάθος. Παρακαλούμε δοκιμάστε ξανά.</p> : <></>}
              {errorpass ? <Input placeholder="Error with password" value="Λανθασμένος κωδικός." type="text" style={{ color: 'red' }} /> : <Input placeholder="Error with password" value="Λανθασμένος κωδικός." type="hidden" style={{ color: 'red' }} />}

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Σύνδεση
                </Button>
                <Button className="my-4" color="warning" type="button">
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}