import { MsalInterceptorConfiguration, MsalGuardConfiguration } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import {
    BrowserCacheLocation,
    Configuration,
    LogLevel
} from '@azure/msal-browser';

export const tenantId = '9a6615b5-879d-4a74-a679-0d66c04b95cf';
export const frontendClientId = '242545f5-b260-4780-b4fe-46e3acc1def2';
export const authority = `https://login.microsoftonline.com/${tenantId}`;
export const redirectUri = 'http://localhost:4200';
export const apiScope = 'api://2c2244e9-79f4-4355-81a2-b86349b4afe2/access_as_user';
export const msalConfig: Configuration = {
    auth: {
        clientId: frontendClientId,
        authority: authority,
        redirectUri: redirectUri,
        postLogoutRedirectUri: redirectUri
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage
    },
    system: {
        allowPlatformBroker: false,
        loggerOptions: {
            loggerCallback: (
                LogLevel: LogLevel,
                message: string,
                containsPii: boolean
            ): void => {
                if (containsPii) {
                    return;
                }
                console.log(`[MSAL ${message}`);
            },
            logLevel: LogLevel.Info,
            piiLoggingEnabled: false
        }
    }
};

export const loginRequest = {
    scopes: [
        'openid',
        'profile',
        apiScope
    ]
};

export function MsalInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();

    protectedResourceMap.set('http://localhost:8080', [apiScope]);

    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap
    };
};

export function MsalGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: loginRequest
    };
}