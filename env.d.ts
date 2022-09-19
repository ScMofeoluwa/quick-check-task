declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PATTERN: string;
      DB_HOST: string;
      DB_USERNAME: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      PORT: string;
      NODE_ENV: string;
    }
  }
}

export {}
