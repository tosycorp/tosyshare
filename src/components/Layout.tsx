import React from 'react';
import Init, { Connected } from './Init';
import Chat from './Chat';

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
