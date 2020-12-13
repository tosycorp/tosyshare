import { API } from 'aws-amplify';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { onPinByConnectionId } from '../graphql/subscriptions';
import { Pin } from '../types';

let subscription: Subscription = null;
let setPin: (pin: number) => void = null;
let pinValue: number = null;

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
    onPinByConnectionIdWrapper(connectionId).subscribe({
      next: ({ value }) => {
        subscriber.next(value.data.onPinByConnectionId);
        subscriber.complete();
        // Stop receiving data updates from the subscription
        subscriber.unsubscribe();
      },
    });
  });
};

const startListenPin = (connectionId: string) => {
  subscription = listenPin(connectionId).subscribe((pin: Pin) => {
    pinValue = pin.value;
    if (setPin) {
      setPin(pinValue);
    }
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  });
};

const setGeneratedPin = (setPinCallBack: (pin: number) => void) => {
  if (pinValue) {
    // Execute callback method if already genereated
    setPinCallBack(pinValue);
  } else {
    // Save callback method to execute on pin generation
    setPin = setPinCallBack;
  }
};

export { startListenPin, setGeneratedPin };
