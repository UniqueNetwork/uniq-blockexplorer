declare type Env = {
  API_URL?: string;
  TOKEN_ID?: string;
  TOKEN_LOGO?: string;
}
declare global {
  interface Window {
    ENV: Env
  }
}

const config: Env = {
  API_URL: window.ENV.API_URL || process.env.REACT_APP_API_URL,
  TOKEN_ID: window.ENV.TOKEN_ID || process.env.REACT_APP_TOKEN_ID,
  TOKEN_LOGO: window.ENV.TOKEN_LOGO || process.env.REACT_APP_TOKEN_LOGO,
}

export default config;
