import { API, graphqlOperation } from 'aws-amplify';
import { listConnections } from '../graphql/queries';
import { createConnection, createConnector } from '../graphql/mutations';

export interface Connection {
  id: string;
  code: number;
  isUsed?: boolean;
  connectors: Connector[];
}

interface Connector {
  id: string;
}

const fetchConnections = async () => {
  try {
    const connectionsData = (await API.graphql(
      graphqlOperation(listConnections)
    )) as {
      data: { listConnections: { items: Connection[] } };
    };
    return connectionsData.data.listConnections.items;
  } catch (err) {
    console.log('error fetching fetchConnections:', err);
    return err;
  }
};

const addConnection = async (input: any) => {
  try {
    const result = await API.graphql(
      graphqlOperation(createConnection, { input })
    );
    return result;
  } catch (err) {
    console.log('error creating addConnection:', err);
    return err;
  }
};

const addConnector = async () => {
  try {
    const connector = await API.graphql(
      graphqlOperation(createConnector, { input: {} })
    );
    return (connector as any).data.createConnector;
  } catch (err) {
    console.log('error creating addConnector:', err);
    return err;
  }
};

const generateCode = async () => {
  const code = Math.floor(Math.random() * 1000000);
  const connections = await fetchConnections();
  const connection = connections?.find((con: any) => con.code === code);
  if (connection) {
    // ToDo
  } else {
    const connector = await addConnector();
    const newConnection = await addConnection({
      code,
      isUsed: false,
      connectors: [{ id: connector.id }],
    });
    console.log(newConnection);
  }

  return code;
};

export { generateCode };
