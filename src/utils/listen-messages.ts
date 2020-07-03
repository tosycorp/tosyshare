import { API, graphqlOperation } from 'aws-amplify';
import { Observable, Subscribable, Subscription, Subscriber } from 'rxjs';
import { onCreateMessage } from '../graphql/subscriptions';

import { Message } from './save-message';

let subscription: Subscription;
let subscriber: Subscriber<Message>;

export const listenMessages = (connectionId: string) => {
  return new Observable<Message>((subs) => {
    subscriber = subs;
    const onCreateMessageWrapper = () => {
      return API.graphql(graphqlOperation(onCreateMessage)) as Subscribable<{
        value: { data: { onCreateMessage: Message } };
      }>;
    };

    subscription = onCreateMessageWrapper().subscribe({
      next: ({ value }) => {
        const message = value.data.onCreateMessage;

        if (message.connection.id === connectionId) {
          subs.next(message);
        }
      },
    }) as Subscription;
  });
};

export const stopListenMessages = () => {
  subscriber.complete();
  // Stop receiving data updates from the subscription
  subscription.unsubscribe();
};
