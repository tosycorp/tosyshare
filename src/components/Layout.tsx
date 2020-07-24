import React from 'react';
import Init from './Init';
import Chat from './Chat';
import { Connected } from '../types';

type LayoutState = {
  connected: Connected;
};
type LayoutProps = {};

class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    this.state = { connected: null };
  }

  onConnected = (connected: Connected) => {
    this.setState({ connected });
  };

  render() {
    const { connected } = this.state;

    return !connected ? (
      <Init onConnected={this.onConnected} />
    ) : (
      <Chat connected={connected} />
    );
  }
}

export default Layout;
