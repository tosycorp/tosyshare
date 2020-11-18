import { API, graphqlOperation } from 'aws-amplify';
import { updateConnector } from '../graphql/mutations';
import getConnectionByCode from './get-connection-by-code';
import { Connection, Connector } from '../types';
import validatePin from './validate-pin';

const updateConnectorWrapper = async (input: {
  id: string;
  connectorConnectionId: string;
}) => {
  return (await API.graphql(graphqlOperation(updateConnector, { input }))) as {
    data: { updateConnector: Connector };
  };
};

const enterPin = async (
  connector: Connector,
  connection: Connection,
  pin?: number
) => {
  if (pin) {
    if (!(await validatePin(pin, connection.id))) {
      // eslint-disable-next-line no-console
      console.log('INVALID PIN');
      return null;
    }
  }
  return (
    await updateConnectorWrapper({
      id: connector.id,
      connectorConnectionId: connection.id,
    })
  ).data.updateConnector;
};

const enterCode = async (code: number, connector: Connector): Promise<any> => {
  const connection = await getConnectionByCode(code);
  if (!connection) {
    return null;
  }

  if (connection.hasPin) {
    return { connector, connection };
  }

  return (
    await updateConnectorWrapper({
      id: connector.id,
      connectorConnectionId: connection.id,
    })
  ).data.updateConnector;
};

export { enterCode, enterPin };
