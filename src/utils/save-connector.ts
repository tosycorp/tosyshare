import { Auth } from 'aws-amplify';
import { createConnector } from '../graphql/mutations';
import { Connector } from '../types';
import gqlOperationCreate from './gql-api.create';

const addConnectorWrapper = async (input: {
  connectorConnectionId: string;
  identityId: string;
}) => {
  return (await gqlOperationCreate(createConnector, input)) as {
    data: { createConnector: Connector };
  };
};

const saveConnector = async (connectionId: string): Promise<Connector> => {
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

export default saveConnector;
