import { CodePinPair } from '../types';

class CodePinManager {
  private codePinKey = 'CODE_PIN';
  private codePin: CodePinPair = null;

  constructor() {
    this.getCodePin();
  }

  getCodePin() {
    const item = localStorage.getItem(this.codePinKey);
    if (item) {
      this.codePin = JSON.parse(item);
    }
    return this.codePin;
  }

  setCodePin(code: number, pin: number) {
    this.codePin = { code, pin };
    localStorage.setItem(this.codePinKey, JSON.stringify(this.codePin));
  }

  clearCodePin() {
    this.codePin = null;
    localStorage.removeItem(this.codePinKey);
  }
}

export default new CodePinManager();
