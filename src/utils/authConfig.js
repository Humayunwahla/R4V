// authConfig.js
import { LogLevel } from "@azure/msal-browser";

const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_signupsignin",
    editProfile: "B2C_1_ProfileEditPolicy"
  },
  authorities: {
    signUpSignIn: {
      authority: "https://rads4vet.b2clogin.com/rads4vet.onmicrosoft.com/B2C_1_signupsignin"
    },
    editProfile: {
      authority: "https://rads4vet.b2clogin.com/rads4vet.onmicrosoft.com/B2C_1_ProfileEditPolicy"
    }
  },
  authorityDomain: "rads4vet.b2clogin.com"
};

export const msalConfig = {
  auth: {
    clientId: "9cd492dc-bbfc-4f16-ac92-073d13d90c5d",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  },
  system: {
    allowNativeBroker: false,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (level === LogLevel.Error) console.error(message);
        if (level === LogLevel.Info) console.info(message);
        if (level === LogLevel.Verbose) console.debug(message);
        if (level === LogLevel.Warning) console.warn(message);
      }
    }
  }
};

// Scopes for initial login
export const loginRequest = {
  scopes: ["openid", "profile"]
};

// Scopes for acquiring an access token (can add API-specific scopes here)
export const tokenRequest = {
  scopes: ["openid", "profile", "https://rads4vet.onmicrosoft.com/rads4vet-webapi/api.read"] // Replace "User.Read" with any custom API scopes if needed
};

export const apiConfig = {
  scopes: ["https://yourapi.onmicrosoft.com/api/read"], // Example for custom API
  uri: "https://yourapi.onmicrosoft.com/api"
};

export { b2cPolicies };
