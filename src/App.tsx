import React, { Suspense } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Layout = React.lazy(() => import('./components/Layout'));

const App = () => {
  return (
    <BrowserRouter>
      <Container className="p-2">
        <Row className="justify-content-center mt-1 mb-1">
          <Col className="text-center align-self-center" md={8}>
            <div>
              <img
                style={{
                  marginBottom: '-20px',
                  marginTop: '-10px',
                }}
                src="/tosy-corp.png"
                height="60"
                className="align-top"
                alt="TOSYCorp logo"
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center no-scroll flex-full px-2">
          <Col
            className="flex-disp flex-col full-height vertical-scroll"
            md={8}
          >
            <Suspense fallback="">
              <Layout />
            </Suspense>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
