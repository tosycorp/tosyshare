import { API, graphqlOperation } from 'aws-amplify';
import { getMessagesByConnectionId as gMBCI } from '../graphql/queries';
import { ActionHandlers, Message } from '../types';
import { evaluateMessage } from './listen-messages';

const getMessagesByConnectionIdWrapper = async (
  messageConnectionId: string
) => {
  return (await API.graphql(
    graphqlOperation(gMBCI, { messageConnectionId, sortDirection: 'DESC' })
  )) as { data: { GetMessagesByConnectionId: { items: Message[] } } };
};

const getMessagesByConnectionId = async (
  connectionId: string,
  actionHandlers: ActionHandlers
): Promise<Message[]> => {
  try {
    const connectionsData = await getMessagesByConnectionIdWrapper(
      connectionId
    );
    return connectionsData.data.GetMessagesByConnectionId.items
      .map((m) => evaluateMessage(m, actionHandlers))
      .filter((m) => !!m)
      .reverse();
  } catch (err) {
    console.error('error fetching fetchConnection:', err);
    return null;
  }
};

export default getMessagesByConnectionId;
