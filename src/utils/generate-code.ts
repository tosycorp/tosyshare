import { createConnection } from '../graphql/mutations';
import getConnectionByCode from './get-connection-by-code';
import { Connection, Connector } from '../types';
import gqlOperationCreate from './gql-api.create';
import saveConnector from './save-connector';

const addConnectionWrapper = async (input: {
  code: number;
  hasPin: boolean;
}) => {
  return (await gqlOperationCreate(createConnection, input)) as {
    data: { createConnection: Connection };
  };
};

const addConnection = async (code: number): Promise<Connection> => {
  try {
    const connection = await addConnectionWrapper({ code, hasPin: false });
    return connection.data.createConnection;
  } catch (err) {
    console.error('error creating addConnection:', err);
    return err;
  }
};

const generateCode = async (): Promise<{
  code: number;
  connector: Connector;
}> => {
  const code = Math.floor(100000 + Math.random() * 900000);

  let connection = await getConnectionByCode(code);
  // If connection with code already generated before, generate another one.
  if (connection) {
    return generateCode();
  }

  connection = await addConnection(code);
  const connector = await saveConnector(connection.id);

  return { code, connector };
};

export default generateCode;
