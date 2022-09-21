declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PATTERN: string;
      DB_HOST: string;
      DB_USERNAME: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      DB_PORT: string;
      NODE_ENV: string;
      BASE_URL: string;
    }
  }
}

export {}
