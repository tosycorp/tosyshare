import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Container>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand>TOSY SHARE</Navbar.Brand>
        </Container>
      </Navbar>
      <Layout />
    </Container>
  );
};

export default App;
