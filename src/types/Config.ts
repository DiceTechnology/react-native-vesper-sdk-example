import type { Environment } from '@dicetechnology/react-native-vesper-sdk';

export interface Config {
    API_KEY: string;
    ENV: Environment;
    IS_LIVE: boolean;
    PASSWORD: string;
    REALM: string;
    USERNAME: string;
    VIDEO_ID: string;
}
