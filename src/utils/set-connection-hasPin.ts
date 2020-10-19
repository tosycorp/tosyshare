import { API, graphqlOperation } from 'aws-amplify';
import { updateConnection } from '../graphql/mutations';
import { Connection } from '../types';

const setConnectionHasPin = async (
  connection: Connection
): Promise<Connection> => {
  const updateConnectionWrapper = async (input: {
    id: string;
    code: number;
    hasPin: boolean;
  }) => {
    return (await API.graphql(
      graphqlOperation(updateConnection, { input })
    )) as {
      data: { updateConnection: Connection };
    };
  };

  return (
    await updateConnectionWrapper({
      id: connection.id,
      code: connection.code,
      hasPin: true,
    })
  ).data.updateConnection;
};

export default setConnectionHasPin;
