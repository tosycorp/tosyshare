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
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
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
          hasPin
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        connectorConnectionId
        createdAt
        updatedAt
      }
      messageConnectionId
      createdAt
      updatedAt
    }
  }
`;
export const onConnectorByConnectionId = /* GraphQL */ `
  subscription OnConnectorByConnectionId($connectorConnectionId: ID!) {
    onConnectorByConnectionId(connectorConnectionId: $connectorConnectionId) {
      id
      identityId
      connection {
        id
        code
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connectorConnectionId
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
      hasPin
      connectors {
        items {
          id
          identityId
          connection {
            id
            code
            hasPin
            createdAt
            updatedAt
          }
          connectorConnectionId
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
      hasPin
      connectors {
        items {
          id
          identityId
          connection {
            id
            code
            hasPin
            createdAt
            updatedAt
          }
          connectorConnectionId
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
      hasPin
      connectors {
        items {
          id
          identityId
          connection {
            id
            code
            hasPin
            createdAt
            updatedAt
          }
          connectorConnectionId
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
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connectorConnectionId
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
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connectorConnectionId
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
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      connectorConnectionId
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePin = /* GraphQL */ `
  subscription OnCreatePin {
    onCreatePin {
      id
      value
      connectionId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePin = /* GraphQL */ `
  subscription OnUpdatePin {
    onUpdatePin {
      id
      value
      connectionId
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePin = /* GraphQL */ `
  subscription OnDeletePin {
    onDeletePin {
      id
      value
      connectionId
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
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
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
          hasPin
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        connectorConnectionId
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
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
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
          hasPin
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        connectorConnectionId
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
        hasPin
        connectors {
          items {
            id
            identityId
            connectorConnectionId
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
          hasPin
          connectors {
            nextToken
          }
          createdAt
          updatedAt
        }
        connectorConnectionId
        createdAt
        updatedAt
      }
      messageConnectionId
      createdAt
      updatedAt
    }
  }
`;
