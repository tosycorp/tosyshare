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
}

export enum Actions {
  SET_PIN = 'SET_PIN',
}
