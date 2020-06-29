/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCar = /* GraphQL */ `
  query GetCar($id: ID!) {
    getCar(id: $id) {
      id
      name
      model
      createdAt
      updatedAt
    }
  }
`;
export const listCars = /* GraphQL */ `
  query ListCars(
    $filter: ModelCarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        model
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConnection = /* GraphQL */ `
  query GetConnection($id: ID!) {
    getConnection(id: $id) {
      id
      code
      isUsed
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
  }
`;
export const listConnections = /* GraphQL */ `
  query ListConnections(
    $filter: ModelConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        isUsed
        connectors {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConnector = /* GraphQL */ `
  query GetConnector($id: ID!) {
    getConnector(id: $id) {
      id
      connection {
        id
        code
        isUsed
        connectors {
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
export const listConnectors = /* GraphQL */ `
  query ListConnectors(
    $filter: ModelConnectorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConnectors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        connection {
          id
          code
          isUsed
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
