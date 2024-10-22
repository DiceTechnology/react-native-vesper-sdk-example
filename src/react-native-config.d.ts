declare module 'react-native-config' {
  export interface NativeConfig {
    PUBLIC_USERNAME: string;
    PUBLIC_PASSWORD: string;
    PUBLIC_REALM: string;
    PUBLIC_API_KEY: string;
    PUBLIC_ENV: string;
  }

  export const Config: NativeConfig
  export default Config
}
