import { API, graphqlOperation } from 'aws-amplify';
import { createMessage } from '../graphql/mutations';
import { Message, Connected } from '../types';

const saveMessage = async (
  value: string,
  connected: Connected,
  type: 'STRING' | 'JSON'
): Promise<Message> => {
  const createMessageWrapper = async (input: {
    type: string;
    value: string;
    messageConnectionId: string;
    messageConnectorId: string;
  }) => {
    return (await API.graphql(graphqlOperation(createMessage, { input }))) as {
      data: { createMessage: Message };
    };
  };

  return (
    await createMessageWrapper({
      type,
      value,
      messageConnectionId: connected.connectionId,
      messageConnectorId: connected.connectorId,
    })
  ).data.createMessage;
};

export default saveMessage;
