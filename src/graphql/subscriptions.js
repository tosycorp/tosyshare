/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onMessageByConnectionId = /* GraphQL */ `
  subscription OnMessageByConnectionId($messageConnectionId: ID!) {
    onMessageByConnectionId(messageConnectionId: $messageConnectionId) {
      id
      type
      value
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connector {
        id
        identityId
        connection {
          id
          code
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      messageConnectionId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateConnection = /* GraphQL */ `
  subscription OnCreateConnection {
    onCreateConnection {
      id
      code
      connectors {
        items {
          id
          identityId
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
          identityId
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
          identityId
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
      identityId
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
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
      identityId
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
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
      identityId
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      type
      value
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connector {
        id
        identityId
        connection {
          id
          code
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      messageConnectionId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      type
      value
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connector {
        id
        identityId
        connection {
          id
          code
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      messageConnectionId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      type
      value
      connection {
        id
        code
        connectors {
          items {
            id
            identityId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connector {
        id
        identityId
        connection {
          id
          code
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      messageConnectionId
      createdAt
      updatedAt
    }
  }
`;
