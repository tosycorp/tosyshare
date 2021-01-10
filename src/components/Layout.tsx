import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import Init from './Init';
import Chat from './Chat';
import { Connected, Routes } from '../types';
import redirect from '../utils/redirect';

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
      redirect(this, Routes.CHAT);
    });
  };

  onOut = () => {
    redirect(this, Routes.INIT);
    this.setState({ connected: null });
  };

  render() {
    const { connected } = this.state;

    return (
      <Switch>
        <Route path={Routes.CHAT} exact>
          {!connected ? (
            <Redirect to={Routes.INIT} />
          ) : (
            <Chat connected={connected} onOut={this.onOut} />
          )}
        </Route>
        {/* Init and subroutes of Init */}
        <Route
          path={[Routes.INIT, Routes.QR, Routes.PIN, Routes.QRMODAL]}
          exact
        >
          <Init onConnected={this.onConnected} />
        </Route>
        {/* if route is not exist redirect to Init */}
        <Redirect to={Routes.INIT} />
      </Switch>
    );
  }
}

export default withRouter(Layout);
