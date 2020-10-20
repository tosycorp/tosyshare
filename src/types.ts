export interface Connection {
  id: string;
  code: number;
  connectors: Connector[];
  hasPin: boolean;
}

export interface Connector {
  id: string;
  connection?: Connection;
  identityId: string;
}

export interface Pin {
  id: string;
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

export interface Message {
  id: string;
  type: MessageType;
  value: string;
  connection: Connection;
  connector: Connector;
}

export enum Actions {
  SET_PIN = 'SET_PIN',
}
