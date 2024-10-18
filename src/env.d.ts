declare namespace NodeJS {
    export interface ProcessEnv {
        PUBLIC_USERNAME: string;
        PUBLIC_PASSWORD: string;
        PUBLIC_REALM: string;
        PUBLIC_API_KEY: string;
        PUBLIC_ENV: string;
    }
  }