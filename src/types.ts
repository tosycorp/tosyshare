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

export interface Message {
  id: string;
  type: 'STRING' | 'JSON';
  value: string;
  connection: Connection;
  connector: Connector;
}
