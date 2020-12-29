import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import Init from './Init';
import Chat from './Chat';
import { Connected } from '../types';

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
      const { history } = this.props;
      history.push('/chat');
    });
  };

  onOut = () => {
    const { history } = this.props;
    history.push('/');
    this.setState({ connected: null });
  };

  render() {
    const { connected } = this.state;

    return (
      <Switch>
        <Route path="/chat" exact>
          <Chat connected={connected} onOut={this.onOut} />
        </Route>
        <Route path="/">
          <Init onConnected={this.onConnected} />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(Layout);
