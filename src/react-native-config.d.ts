import { Environment } from "@dicetechnology/react-native-vesper-sdk";

declare module 'react-native-config' {
  export interface NativeConfig {
    PUBLIC_USERNAME: string;
    PUBLIC_PASSWORD: string;
    PUBLIC_REALM: string;
    PUBLIC_API_KEY: string;
    PUBLIC_ENV: Environment;
  }

  export const Config: NativeConfig
  export default Config
}
