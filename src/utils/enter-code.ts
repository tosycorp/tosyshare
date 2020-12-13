import { API, graphqlOperation } from 'aws-amplify';
import { updateConnector } from '../graphql/mutations';
import getConnectionByCode from './get-connection-by-code';
import { EnterCodeErrors, Connector } from '../types';
import validatePin from './validate-pin';
import { startListenPin } from './listen-pin';

const updateConnectorWrapper = async (input: {
  id: string;
  connectorConnectionId: string;
}) => {
  return (await API.graphql(graphqlOperation(updateConnector, { input }))) as {
    data: { updateConnector: Connector };
  };
};

const enterCode = async (
  code: number,
  connectorId: string,
  onPinRequired: () => Promise<number>
): Promise<{ updatedConnector: Connector; pin: number }> => {
  const connection = await getConnectionByCode(code);
  if (!connection) {
    throw Error(EnterCodeErrors.NO_CONNECTION_FOUND);
  }

  let pin;
  if (connection.hasPin) {
    pin = await onPinRequired();
    if (!pin || !(await validatePin(pin, connection.id))) {
      throw Error(EnterCodeErrors.INVALID_PIN);
    }
  } else {
    // Connection has no pin for first participant.
    // Pin is generated after first participant connected. Start listen pin to get generated pin
    startListenPin(connection.id);
  }

  const { data } = await updateConnectorWrapper({
    id: connectorId,
    connectorConnectionId: connection.id,
  });

  return { updatedConnector: data.updateConnector, pin };
};

export default enterCode;
