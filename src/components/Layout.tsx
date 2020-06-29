import React from 'react';
import { generateCode } from '../utils/code-genarator';

class Layout extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { code: '' };
  }

  async componentDidMount() {
    this.setState({ code: await generateCode() });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {(this.state as any).code} .</h2>
      </div>
    );
  }
}

export default Layout;
