import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://auth.prohelika.net/realms/test',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'dashboard',
    scope: 'openid profile offline_access', // 'openid profile offline_access ' + your scopes
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    ignoreNonceAfterRefresh: true, // this is required if the id_token is not returned
    triggerRefreshWhenIdTokenExpired: true, // required when refreshing the browser if id_token is not updated after the first authentication
    // allowUnsafeReuseRefreshToken: true, // this is required if the refresh token is not rotated
    autoUserInfo: true, // if the user endpoint is not supported
    renewTimeBeforeTokenExpiresInSeconds: 30,
    logLevel: LogLevel.Debug,
  }
}
