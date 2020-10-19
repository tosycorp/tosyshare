import { API, graphqlOperation } from 'aws-amplify';
import { createPin } from '../graphql/mutations';
import { Pin } from '../types';

const generatePin = async (connectionId: string): Promise<Pin> => {
  const createPinWrapper = async (input: {
    value: number;
    connectionId: string;
  }) => {
    return (await API.graphql(graphqlOperation(createPin, { input }))) as {
      data: { createPin: Pin };
    };
  };

  const value = Math.floor(1000 + Math.random() * 9000);
  const pin = (
    await createPinWrapper({
      value,
      connectionId,
    })
  ).data.createPin;

  return pin;
};

export default generatePin;
