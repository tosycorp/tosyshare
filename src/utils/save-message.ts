import { API, graphqlOperation } from 'aws-amplify';
import { createMessage } from '../graphql/mutations';
import { Connector, Connection } from './code-genarator';
import { Connected } from '../components/Init';

export interface Message {
    id: string;
    type: 'STRING' | 'FILE';
    value: string;
    connection: Connection;
    connector: Connector;
}

export const saveMessage = async (value: string, connected: Connected): Promise<Message> => {
    const createMessageWrapper = async (input: { type: string, value: string, messageConnectionId: string, messageConnectorId: string }) => {
        return await API.graphql(graphqlOperation(createMessage, { input })) as ({ data: { createMessage: Message } });
    };

    return (await createMessageWrapper({ type: 'STRING', value, messageConnectionId: connected.connectionId, messageConnectorId: connected.connectorId })).data.createMessage;
};
