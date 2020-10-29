export enum Env {
  dev = 'dev',
  prod = 'prod',
}

const env: Env = window.location.href.includes('tosycorp.com')
  ? Env.prod
  : Env.dev;
export default env;
