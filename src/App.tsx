import React, { Suspense } from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Layout = React.lazy(() => import('./components/Layout'));

const App = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-1 mb-1">
        <Col md={8}>
          <Navbar bg="light" expand>
            <Col md={4}>
              <Navbar.Brand className="pt-0 pb-0">
                <img
                  src="/tosy-corp.png"
                  height="40"
                  className="d-inline-block align-top"
                  alt="TOSYCorp logo"
                />
              </Navbar.Brand>
            </Col>
            <Col className="text-center" md={4}>
              <Navbar.Brand>TOSY SHARE</Navbar.Brand>
            </Col>
          </Navbar>
        </Col>
      </Row>
      <Row className="justify-content-center no-scroll flex-full">
        <Col className="flex-disp flex-col full-height " md={8}>
          <Suspense fallback="Loading...">
            <Layout />
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
