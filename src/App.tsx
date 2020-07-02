import React from 'react';
import Layout from './components/Layout';

interface ToDo {
  id?: string;
  name: string;
  description: string;
}

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flex: 1,
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    padding: 20,
  },
};

const App = () => {
  return (
    <div style={styles.container}>
      <Layout />
    </div>
  );
};

export default App;
