import { API, graphqlOperation } from 'aws-amplify';
import { getConnectionsByCode } from '../graphql/queries';
import { Connection } from '../types';

const getConnectionByCodeWrapper = async (code: number) => {
  return (await API.graphql(
    graphqlOperation(getConnectionsByCode, { code })
  )) as { data: { GetConnectionsByCode: { items: Connection[] } } };
};

const getConnectionByCode = async (code: number): Promise<Connection> => {
  try {
    const connectionsData = await getConnectionByCodeWrapper(code);
    return connectionsData.data.GetConnectionsByCode.items[0];
  } catch (err) {
    console.error('error fetching fetchConnection:', err);
    return null;
  }
};

export default getConnectionByCode;
