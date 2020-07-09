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
          <Navbar variant="dark" bg="primary" expand>
            <Container>
              <Navbar.Brand>TOSY SHARE</Navbar.Brand>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Suspense fallback="Loading...">
            <Layout />
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
