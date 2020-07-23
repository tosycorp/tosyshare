import { API } from 'aws-amplify';
import { Observable, Subscribable, Subscription, Subscriber } from 'rxjs';
import { onMessageByConnectionId } from '../graphql/subscriptions';

import { Message } from './save-message';

let subscription: Subscription;
let subscriber: Subscriber<Message>;

export const listenMessages = (connectionId: string) => {
  return new Observable<Message>((subs) => {
    subscriber = subs;
    const onMessageByConnectionIdWrapper = () => {
      return API.graphql({
        query: onMessageByConnectionId,
        variables: {
          messageConnectionId: connectionId,
        },
      }) as Subscribable<{
        value: { data: { onMessageByConnectionId: Message } };
      }>;
    };

    subscription = onMessageByConnectionIdWrapper().subscribe({
      next: ({ value }) => subs.next(value.data.onMessageByConnectionId),
    }) as Subscription;
  });
};

export const stopListenMessages = () => {
  subscriber.complete();
  // Stop receiving data updates from the subscription
  subscription.unsubscribe();
};
