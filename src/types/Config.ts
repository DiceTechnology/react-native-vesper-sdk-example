import { Environment } from "@dicetechnology/react-native-vesper-sdk";

export interface Config {
    PUBLIC_USERNAME: string;
    PUBLIC_PASSWORD: string;
    PUBLIC_REALM: string;
    PUBLIC_API_KEY: string;
    PUBLIC_ENV: Environment;
}