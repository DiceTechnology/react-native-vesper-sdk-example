import { AuthManager } from "@dicetechnology/react-native-vesper-sdk";

export class DemoAuthManager implements AuthManager {
    private _authToken?: string;
    private _refreshToken?: string;

    public async login(id: string, secret: string): Promise<void> {
        if (this._authToken) {
            console.log('Already logged in!');
            return;
        }

        console.info(`Logging in with '${id}'...`);

        const response = await fetch("https://dce-frontoffice.imggaming.com/api/v2/login", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "app": "dice",
                "content-type": "application/json",
                "realm": process.env.EXPO_PUBLIC_REALM,
                "x-api-key": process.env.EXPO_PUBLIC_API_KEY,
            },
            "body": JSON.stringify({
                id,
                secret
            }),
            "method": "POST",
            "mode": "cors"
        });

        const json = await response.json();

        this._authToken = json.authorisationToken;
        this._refreshToken = json.refreshToken;
        
        console.info(`Logged in with '${id}'!`);
    }

    public async getAuthToken(): Promise<string> {
        console.info(`Requesting auth token...`);
        if (!this._authToken) {
            throw new Error('Login first!');
        }
        return this._authToken;
    }

    public async getRefreshToken(): Promise<string> {
        console.info(`Requesting refresh token...`);
        if (!this._refreshToken) {
            throw new Error('Login first!');
        }
        return this._refreshToken;
    }

    public async refreshAuthToken(authToken: string): Promise<string> {
        console.info(`Requesting auth token refresh...`);
        throw new Error('Refresh flow not implemented!')
    }
}