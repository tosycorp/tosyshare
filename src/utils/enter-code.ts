import { API, graphqlOperation } from 'aws-amplify';
import { updateConnector } from '../graphql/mutations';
import { fetchConnectionByCode, Connector } from './code-genarator';

export const enterCode = async (code: number, connector: Connector): Promise<Connector> => {
    const connection = await fetchConnectionByCode(code);
    if(!connection){
        return null;
    }

    const updateConnectorWrapper = async (input: { id: string, connectorConnectionId: string }) => {
        return await API.graphql(graphqlOperation(updateConnector, { input })) as ({ data: { updateConnector: Connector } });
    };

    return await (await updateConnectorWrapper({ id: connector.id, connectorConnectionId: connection.id })).data.updateConnector;
};
