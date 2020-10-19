/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createConnection = /* GraphQL */ `
  mutation CreateConnection(
    $input: CreateConnectionInput!
    $condition: ModelConnectionConditionInput
  ) {
    createConnection(input: $input, condition: $condition) {
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
export const updateConnection = /* GraphQL */ `
  mutation UpdateConnection(
    $input: UpdateConnectionInput!
    $condition: ModelConnectionConditionInput
  ) {
    updateConnection(input: $input, condition: $condition) {
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
export const deleteConnection = /* GraphQL */ `
  mutation DeleteConnection(
    $input: DeleteConnectionInput!
    $condition: ModelConnectionConditionInput
  ) {
    deleteConnection(input: $input, condition: $condition) {
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
export const createConnector = /* GraphQL */ `
  mutation CreateConnector(
    $input: CreateConnectorInput!
    $condition: ModelConnectorConditionInput
  ) {
    createConnector(input: $input, condition: $condition) {
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
export const updateConnector = /* GraphQL */ `
  mutation UpdateConnector(
    $input: UpdateConnectorInput!
    $condition: ModelConnectorConditionInput
  ) {
    updateConnector(input: $input, condition: $condition) {
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
export const deleteConnector = /* GraphQL */ `
  mutation DeleteConnector(
    $input: DeleteConnectorInput!
    $condition: ModelConnectorConditionInput
  ) {
    deleteConnector(input: $input, condition: $condition) {
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
export const createPin = /* GraphQL */ `
  mutation CreatePin(
    $input: CreatePinInput!
    $condition: ModelPinConditionInput
  ) {
    createPin(input: $input, condition: $condition) {
      id
      value
      connectionId
      createdAt
      updatedAt
    }
  }
`;
export const updatePin = /* GraphQL */ `
  mutation UpdatePin(
    $input: UpdatePinInput!
    $condition: ModelPinConditionInput
  ) {
    updatePin(input: $input, condition: $condition) {
      id
      value
      connectionId
      createdAt
      updatedAt
    }
  }
`;
export const deletePin = /* GraphQL */ `
  mutation DeletePin(
    $input: DeletePinInput!
    $condition: ModelPinConditionInput
  ) {
    deletePin(input: $input, condition: $condition) {
      id
      value
      connectionId
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
