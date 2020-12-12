import { API, graphqlOperation } from 'aws-amplify';
import { updateConnector } from '../graphql/mutations';
import getConnectionByCode from './get-connection-by-code';
import { EnterCodeErrors, Connector } from '../types';
import validatePin from './validate-pin';
import { startListenPin } from './listen-pin';

const enterCode = async (
  code: number,
  connectorId: string,
  onPinRequired: () => Promise<number>
): Promise<Connector> => {
  const connection = await getConnectionByCode(code);
  if (!connection) {
    throw Error(EnterCodeErrors.NO_CONNECTION_FOUND);
  }

  if (connection.hasPin) {
    const pin = await onPinRequired();
    if (!pin || !(await validatePin(pin, connection.id))) {
      throw Error(EnterCodeErrors.INVALID_PIN);
    }
  } else {
    startListenPin(connection.id);
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
      id: connectorId,
      connectorConnectionId: connection.id,
    })
  ).data.updateConnector;
};

export default enterCode;
