/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onMessageByConnectionId = /* GraphQL */ `
  subscription OnMessageByConnectionId($messageConnectionId: ID!) {
    onMessageByConnectionId(messageConnectionId: $messageConnectionId) {
      id
      expDate
      type
      value
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
        expDate
        identityId
        connection {
          id
          expDate
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
      expDate
      identityId
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
      expDate
      code
      hasPin
      connectors {
        items {
          id
          expDate
          identityId
          connection {
            id
            expDate
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
      expDate
      code
      hasPin
      connectors {
        items {
          id
          expDate
          identityId
          connection {
            id
            expDate
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
      expDate
      code
      hasPin
      connectors {
        items {
          id
          expDate
          identityId
          connection {
            id
            expDate
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
      expDate
      identityId
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
      expDate
      identityId
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
      expDate
      identityId
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
      expDate
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
      expDate
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
      expDate
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
      expDate
      type
      value
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
        expDate
        identityId
        connection {
          id
          expDate
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
      expDate
      type
      value
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
        expDate
        identityId
        connection {
          id
          expDate
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
      expDate
      type
      value
      connection {
        id
        expDate
        code
        hasPin
        connectors {
          items {
            id
            expDate
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
        expDate
        identityId
        connection {
          id
          expDate
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
