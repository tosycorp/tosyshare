import { API } from 'aws-amplify';
import { Observable, Subscribable } from 'rxjs';
import { onConnectorByConnectionId } from '../graphql/subscriptions';
import { Connector } from '../types';

const listenConnection = (connectionId: string) => {
  return new Observable<void>((subscriber) => {
    const onConnectorByConnectionIdWrapper = () => {
      return API.graphql({
        query: onConnectorByConnectionId,
        variables: {
          connectorConnectionId: connectionId,
        },
      }) as Subscribable<{
        value: { data: { onConnectorByConnectionId: Connector } };
      }>;
    };

    const subscription = onConnectorByConnectionIdWrapper().subscribe({
      next: () => {
        subscriber.next();
        subscriber.complete();
        // Stop receiving data updates from the subscription
        subscription.unsubscribe();
      },
    });
  });
};

export default listenConnection;
