import { API } from 'aws-amplify';
import { Observable, Subscribable, Subscription, Subscriber } from 'rxjs';
import { onMessageByConnectionId } from '../graphql/subscriptions';
import { Message } from '../types';

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
      next: ({ value }) => {
        const m = value.data.onMessageByConnectionId;
        if (m) {
          subs.next(m);
        }
      },
    }) as Subscription;
  });
};

export const stopListenMessages = () => {
  if (subscriber) {
    subscriber.complete();
  }
  // Stop receiving data updates from the subscription
  if (subscription && !subscription.closed) {
    subscription.unsubscribe();
  }
};
