import { API } from 'aws-amplify';
import { Observable, Subscribable } from 'rxjs';
import { onPinByConnectionId } from '../graphql/subscriptions';
import { Pin } from '../types';

const onPinByConnectionIdWrapper = (connectionId: string) => {
  return API.graphql({
    query: onPinByConnectionId,
    variables: {
      connectionId,
    },
  }) as Subscribable<{
    value: { data: { onPinByConnectionId: Pin } };
  }>;
};

const listenPin = (connectionId: string) => {
  return new Observable<Pin>((subscriber) => {
    const subscription = onPinByConnectionIdWrapper(connectionId).subscribe({
      next: ({ value }) => {
        subscriber.next(value.data.onPinByConnectionId);
        subscriber.complete();
        // Stop receiving data updates from the subscription
        subscription.unsubscribe();
      },
    });
  });
};

export default listenPin;
