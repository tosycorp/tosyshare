import { Connector, SessionValues } from '../types';

class SessionManager {
  private sessionKey = 'SESSION';
  private sessionValues: SessionValues = null;

  constructor() {
    this.getSessionValues();
  }

  getSessionValues(): SessionValues {
    const item = localStorage.getItem(this.sessionKey);
    if (item) {
      this.sessionValues = JSON.parse(item);
    }
    return this.sessionValues;
  }

  setSessionPinValue(pin: number) {
    if (!this.sessionValues) {
      return;
    }
    const { code, connector } = this.sessionValues;
    this.setSessionValues(code, pin, connector);
  }

  setSessionValues(code: number, pin: number, connector: Connector) {
    this.sessionValues = { code, pin, connector };
    localStorage.setItem(this.sessionKey, JSON.stringify(this.sessionValues));
  }

  clearSessionValues() {
    this.sessionValues = null;
    localStorage.removeItem(this.sessionKey);
  }
}

export default new SessionManager();
