import { API, graphqlOperation } from 'aws-amplify';
import { Observable, Subscribable } from 'rxjs';
import { onUpdateConnector } from '../graphql/subscriptions';
import { Connector } from './code-genarator';

export default (connectionId: string) => {
  return new Observable<void>((subscriber) => {
    const onUpdateConnectorWrapper = () => {
      return API.graphql(graphqlOperation(onUpdateConnector)) as Subscribable<{
        value: { data: { onUpdateConnector: Connector } };
      }>;
    };

    const subscription = onUpdateConnectorWrapper().subscribe({
      next: ({ value }) => {
        const connector = value.data.onUpdateConnector;

        if (connector.connection.id === connectionId) {
          subscriber.next();
          subscriber.complete();
          // Stop receiving data updates from the subscription
          subscription.unsubscribe();
        }
      },
    });
  });
};
