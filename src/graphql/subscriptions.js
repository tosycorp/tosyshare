/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConnection = /* GraphQL */ `
  subscription OnCreateConnection {
    onCreateConnection {
      id
      code
      connectors {
        items {
          id
          connection {
            id
            code
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateConnection = /* GraphQL */ `
  subscription OnUpdateConnection {
    onUpdateConnection {
      id
      code
      connectors {
        items {
          id
          connection {
            id
            code
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteConnection = /* GraphQL */ `
  subscription OnDeleteConnection {
    onDeleteConnection {
      id
      code
      connectors {
        items {
          id
          connection {
            id
            code
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateConnector = /* GraphQL */ `
  subscription OnCreateConnector {
    onCreateConnector {
      id
      connection {
        id
        code
        connectors {
          items {
            id
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateConnector = /* GraphQL */ `
  subscription OnUpdateConnector {
    onUpdateConnector {
      id
      connection {
        id
        code
        connectors {
          items {
            id
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteConnector = /* GraphQL */ `
  subscription OnDeleteConnector {
    onDeleteConnector {
      id
      connection {
        id
        code
        connectors {
          items {
            id
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
