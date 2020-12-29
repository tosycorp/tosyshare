import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import Init from './Init';
import Chat from './Chat';
import { Connected, Routes } from '../types';
import pushHistory from '../utils/push-history';

type LayoutState = {
  connected: Connected;
};

class Layout extends React.Component<RouteComponentProps, LayoutState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { connected: null };
  }

  onConnected = (connected: Connected) => {
    this.setState({ connected }, () => {
      pushHistory(this, Routes.CHAT);
    });
  };

  onOut = () => {
    pushHistory(this, Routes.INIT);
    this.setState({ connected: null });
  };

  render() {
    const { connected } = this.state;

    return (
      <Switch>
        <Route path={Routes.CHAT}>
          <Chat connected={connected} onOut={this.onOut} />
        </Route>
        <Route path={Routes.INIT}>
          <Init onConnected={this.onConnected} />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Layout);
