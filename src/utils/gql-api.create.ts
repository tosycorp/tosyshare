import { API, graphqlOperation } from 'aws-amplify';

const oneDayInSeconds = 24 * 60 * 60;

const gqlOperationCreate = (operation: any, input: any): any => {
  const now = Math.floor(Date.now() / 1000);
  const expDate = now + oneDayInSeconds;
  return API.graphql(
    graphqlOperation(operation, { input: { ...input, expDate } })
  );
};

export default gqlOperationCreate;
