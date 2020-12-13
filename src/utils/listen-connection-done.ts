import { Connection } from '../types';
import generatePin from './generate-pin';
import setConnectionHasPin from './set-connection-hasPin';

const listenConnectionDone = async (connection: Connection) => {
  // Generate pin for 'connectionId'
  const pin = await generatePin(connection.id);

  // Update connection 'hasPin' property to 'true'
  await setConnectionHasPin(connection);

  return { pin };
};

export default listenConnectionDone;
