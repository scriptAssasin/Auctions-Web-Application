
/*eslint-disable*/

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center text-center justify-content-xl-between">
            <Col xl="12">
              <div className="copyright text-center text-muted">
                © {new Date().getFullYear()}{" "}

                ΔΗΜΟΠΡΑΣΙΕΣ
              </div>
            </Col>

          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
