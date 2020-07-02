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
    this.state = { ...this.state };
  }

  private onConnected(connected: Connected) {
    this.setState({ ...this.state, connected });
  }

  public render() {
    return !this.state.connected ? <Init onConnected={this.onConnected.bind(this)} ></Init> : <Chat connected={this.state.connected}></Chat>;
  }
}

export default Layout;
