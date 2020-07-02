import { API, graphqlOperation } from 'aws-amplify';
import { onCreateMessage } from '../graphql/subscriptions';

import { Observable, ZenObservable } from 'zen-observable-ts';
import { Message } from './save-message';

let subscription: ZenObservable.Subscription;
let subscriber: ZenObservable.SubscriptionObserver<Message>;

export const listenMessages = (connectionId: string) => {
    return new Observable<Message>((subs) => {
        subscriber = subs;
        const onCreateMessageWrapper = () => {
            return API.graphql(graphqlOperation(onCreateMessage)) as Observable<({ value: ({ data: { onCreateMessage: Message } }) })>;
        };

        subscription = onCreateMessageWrapper()
            .subscribe({
                next: ({ value }) => {
                    const message = value.data.onCreateMessage;

                    if (message.connection.id === connectionId) {
                        subs.next(message);
                    }
                }
            });
    });
};

export const stopListenMessages = () => {
    subscriber.complete();
    // Stop receiving data updates from the subscription
    subscription.unsubscribe();
}
