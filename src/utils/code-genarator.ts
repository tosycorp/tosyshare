import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getConnectionsByCode } from '../graphql/queries';
import { createConnection, createConnector } from '../graphql/mutations';

export interface Connection {
  id: string;
  code: number;
  connectors: Connector[];
}

export interface Connector {
  id: string;
  connection?: Connection;
}

const fetchConnectionByCodeWrapper = async (code: number) => {
  return (await API.graphql(
    graphqlOperation(getConnectionsByCode, { code })
  )) as { data: { GetConnectionsByCode: { items: Connection[] } } };
};

export const fetchConnectionByCode = async (
  code: number
): Promise<Connection> => {
  try {
    const connectionsData = await fetchConnectionByCodeWrapper(code);
    return connectionsData.data.GetConnectionsByCode.items[0];
  } catch (err) {
    console.error('error fetching fetchConnection:', err);
    return null;
  }
};

const addConnectionWrapper = async (input: { code: number }) => {
  return (await API.graphql(graphqlOperation(createConnection, { input }))) as {
    data: { createConnection: Connection };
  };
};

const addConnection = async (code: number): Promise<Connection> => {
  try {
    const connection = await addConnectionWrapper({ code });
    return connection.data.createConnection;
  } catch (err) {
    console.error('error creating addConnection:', err);
    return err;
  }
};

const addConnectorWrapper = async (input: {
  connectorConnectionId: string;
  identityId: string;
}) => {
  return (await API.graphql(graphqlOperation(createConnector, { input }))) as {
    data: { createConnector: Connector };
  };
};

const addConnector = async (connectionId: string): Promise<Connector> => {
  try {
    const { identityId } = await Auth.currentCredentials();

    const connector = await addConnectorWrapper({
      connectorConnectionId: connectionId,
      identityId,
    });
    return connector.data.createConnector;
  } catch (err) {
    console.error('error creating addConnector:', err);
    return err;
  }
};

export const generateCode = async (): Promise<{
  code: number;
  connector: Connector;
  connection: Connection;
}> => {
  const code = Math.floor(100000 + Math.random() * 900000);

  let connection = await fetchConnectionByCode(code);
  // If connection with code already generated before, generate another one.
  if (connection) {
    return generateCode();
  }

  connection = await addConnection(code);
  const connector = await addConnector(connection.id);

  return { code, connector, connection };
};
