import { API, graphqlOperation } from 'aws-amplify';
import { getPinsByValue } from '../graphql/queries';
import { Pin } from '../types';

const getPinsByValueWrapper = async (value: number) => {
  return (await API.graphql(graphqlOperation(getPinsByValue, { value }))) as {
    data: { GetPinsByValue: { items: Pin[] } };
  };
};

const validatePin = async (
  value: number,
  connectionId: string
): Promise<boolean> => {
  try {
    const pinsData = await getPinsByValueWrapper(value);
    return pinsData.data.GetPinsByValue.items[0].connectionId === connectionId;
  } catch (err) {
    console.error('error fetching getPinsByValueWrapper:', err);
    return null;
  }
};

export default validatePin;
