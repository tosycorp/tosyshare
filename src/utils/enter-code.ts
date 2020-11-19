import { API, graphqlOperation } from 'aws-amplify';
import { updateConnector } from '../graphql/mutations';
import getConnectionByCode from './get-connection-by-code';
import { Connector } from '../types';
import validatePin from './validate-pin';

const enterCode = async (
  code: number,
  connector: Connector,
  onPinRequired?: () => Promise<number>
): Promise<Connector> => {
  const connection = await getConnectionByCode(code);
  if (!connection) {
    return null;
  }

  if (connection.hasPin) {
    const pin = await onPinRequired();
    if (!pin || !(await validatePin(pin, connection.id))) {
      // eslint-disable-next-line no-console
      console.log('INVALID PIN');
      return null;
    }
  }

  const updateConnectorWrapper = async (input: {
    id: string;
    connectorConnectionId: string;
  }) => {
    return (await API.graphql(
      graphqlOperation(updateConnector, { input })
    )) as { data: { updateConnector: Connector } };
  };

  return (
    await updateConnectorWrapper({
      id: connector.id,
      connectorConnectionId: connection.id,
    })
  ).data.updateConnector;
};

export default enterCode;
