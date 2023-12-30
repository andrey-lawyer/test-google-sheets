export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT_DB: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      GOOGLE_API_KEY: string;
      DOC_ID: string;
    }
  }
}
