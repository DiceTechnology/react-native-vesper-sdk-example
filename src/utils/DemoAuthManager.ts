import { AuthManager } from "@dicetechnology/react-native-vesper-sdk";
import { getApiBaseUrl } from "./getApiBaseUrl";
import { CONFIG } from "../constants/CONFIG";

class DemoAuthManager implements AuthManager {
    private _authToken?: string;
    private _refreshToken?: string;

    public async login(id: string, secret: string): Promise<void> {
        if (this._authToken) {
            console.log('Already logged in!');
            return;
        }

        console.info(`Logging in with '${id}'...`);

        const baseUrl = getApiBaseUrl(CONFIG.PUBLIC_ENV);

        const response = await fetch(`${baseUrl}/login`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "app": "dice",
                "content-type": "application/json",
                "realm": CONFIG.PUBLIC_REALM,
                "x-api-key": CONFIG.PUBLIC_API_KEY,
            },
            "body": JSON.stringify({
                id,
                secret
            }),
            "method": "POST",
            "mode": "cors"
        });

        const json = await response.json();
    
        if (response.ok) {
            this._authToken = json.authorisationToken;
            this._refreshToken = json.refreshToken;
            console.info(`Logged in with '${id}'!`);
        } else {
            throw new Error(`Failed to log in! ${json.code} - ${json.messages.join()}`)
        }
    }

    public async getAuthToken(): Promise<string> {
        console.info(`Requesting auth token...`);
        if (!this._authToken) {
            console.error('Login first!');
            throw new Error('Login first!');
        }
        return this._authToken;
    }

    public async getRefreshToken(): Promise<string> {
        console.info(`Requesting refresh token...`);
        if (!this._refreshToken) {
            console.error('Login first!');
            throw new Error('Login first!');
        }
        return this._refreshToken;
    }

    public async refreshAuthToken(authToken: string): Promise<string> {
        console.info(`Requesting auth token refresh...`);

        const baseUrl = getApiBaseUrl(CONFIG.PUBLIC_ENV);
        
        const response = await fetch(`${baseUrl}/token/refresh`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "app": "dice",
                "authorization": `Bearer ${authToken}`,
                "content-type": "application/json",
                "realm": CONFIG.PUBLIC_REALM,
                "x-api-key": CONFIG.PUBLIC_API_KEY,
            },
            "body": JSON.stringify({
                refreshToken: this._refreshToken
            }),
            "method": "POST",
            "mode": "cors"
        });
        
        const json = await response.json();

        this._authToken = json.authorisationToken;
        if (!this._authToken) {
            console.error('Invalid API response!');
            throw new Error('Invalid API response!');
        }

        console.info(`Token refreshed!`);
        return this._authToken;
    }
}

export const authManager = new DemoAuthManager();