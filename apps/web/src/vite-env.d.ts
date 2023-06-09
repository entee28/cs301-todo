/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_AUTH_ENDPOINT: string;
  readonly VITE_COGNITO_REDIRECT_URL: string;
  readonly VITE_COGNITO_LOGOUT_ENDPOINT: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_COGNITO_TOKEN_ENDPOINT: string;
  readonly VITE_API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
