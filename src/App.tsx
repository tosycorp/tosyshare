import React, { Suspense } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = React.lazy(() => import('./components/Layout'));

const App = () => {
  return (
    <Container>
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand>TOSY SHARE</Navbar.Brand>
        </Container>
      </Navbar>
      <Suspense fallback="Loading...">
        <Layout />
      </Suspense>
    </Container>
  );
};

export default App;
