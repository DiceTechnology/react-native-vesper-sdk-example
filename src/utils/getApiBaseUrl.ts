import { Environment } from "@dicetechnology/react-native-vesper-sdk";

export const getApiBaseUrl = (environment: string): string => {
    switch (environment) {
        case Environment.DEVELOPMENT: {
            return `https://dce-frontoffice-dev.imggaming.com/api/v2`;
        }
        case Environment.STAGING: {
            return `https://dce-frontoffice-stag.imggaming.com/api/v2`;
        }
        default: {
            return `https://dce-frontoffice.imggaming.com/api/v2`;
        }
    }
};
