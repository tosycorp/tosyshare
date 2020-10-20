import { Actions, Connection, Connector, MessageType } from '../types';
import generatePin from './generate-pin';
import saveMessage from './save-message';
import setConnectionHasPin from './set-connection-hasPin';

const listenConnectionDone = async (
  connection: Connection,
  connector: Connector
) => {
  // Generate pin for 'connectionId'
  const pin = await generatePin(connection.id);

  // Update connection 'hasPin' property to 'true'
  await setConnectionHasPin(connection);

  // Send created pin to other connector
  const setPinAction = { type: Actions.SET_PIN, value: pin.value };
  await saveMessage(
    JSON.stringify(setPinAction),
    {
      connectionId: connection.id,
      connectorId: connector.id,
      code: null,
    },
    MessageType.ACTION
  );

  return { pin };
};

export default listenConnectionDone;
