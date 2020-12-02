import { API } from 'aws-amplify';
import { Observable, Subscribable, Subscription, Subscriber } from 'rxjs';
import { onMessageByConnectionId } from '../graphql/subscriptions';
import { ActionHandlers, JSONMessage, Message, MessageType } from '../types';

const doAction = (m: Message, ah: ActionHandlers) => {
  const obj = JSON.parse(m.value) as JSONMessage;
  const { type, value } = obj;
  if (!ah || !ah[type]) {
    return;
  }

  ah[type](value);
};

let subscription: Subscription;
let subscriber: Subscriber<Message>;

export const evaluateMessage = (
  m: Message,
  actionHandlers: ActionHandlers
): Message => {
  if (m.type === MessageType.ACTION) {
    doAction(m, actionHandlers);
    return null;
  }
  return m;
};

export const listenMessages = (
  connectionId: string,
  actionHandlers: ActionHandlers
) => {
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
        const m = evaluateMessage(
          value.data.onMessageByConnectionId,
          actionHandlers
        );
        if (m) {
          subs.next(m);
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
