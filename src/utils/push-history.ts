import { RouteComponentProps } from 'react-router-dom';
import { Routes } from '../types';

export default function pushHistory(
  component: React.Component<RouteComponentProps>,
  route: Routes
) {
  const { history } = component.props;
  history.push(route);
}
