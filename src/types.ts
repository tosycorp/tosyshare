export interface Navigator {
  share?: (options: any) => Promise<void>;
}

interface DynamoDbTable {
  id: string;
  createdAt: string;
  updatedAt: string;
  expDate: number;
}

export interface Connection extends DynamoDbTable {
  code: number;
  connectors: Connector[];
  hasPin: boolean;
}

export interface Connector extends DynamoDbTable {
  connection?: Connection;
  identityId: string;
}

export interface Pin extends DynamoDbTable {
  value: number;
  connectionId: string;
}

export interface Connected {
  connectionId: string;
  connectorId: string;
  code: number;
  pin?: number;
}

export type JSONMessage = {
  url: string;
  fileName: string;
  type: string;
  value?: any;
};

export enum MessageType {
  STRING = 'STRING',
  JSON = 'JSON',
  ACTION = 'ACTION',
}

export interface Message extends DynamoDbTable {
  type: MessageType;
  value: string;
  connection: Connection;
  connector: Connector;
  messageConnectionId: string;
  messageConnectorId: string;
}

export enum Actions {
  SET_PIN = 'SET_PIN',
}

export type ActionHandlers = { [key: string]: (val?: any) => void };

export enum EnterCodeErrors {
  NO_CONNECTION_FOUND = 'NO_CONNECTION_FOUND',
  INVALID_PIN = 'INVALID_PIN',
}

export interface SessionValues {
  code: number;
  pin: number;
  connectorId: string;
}
