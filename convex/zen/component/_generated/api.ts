/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as _runtime from "../_runtime.js";
import type * as gateway from "../gateway.js";
import type * as systemAdmin_gateway from "../systemAdmin/gateway.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import { anyApi, componentsGeneric } from "convex/server";

const fullApi: ApiFromModules<{
  _runtime: typeof _runtime;
  gateway: typeof gateway;
  "systemAdmin/gateway": typeof systemAdmin_gateway;
}> = anyApi as any;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
> = anyApi as any;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
> = anyApi as any;

export const components = componentsGeneric() as unknown as {
  core: {
    gateway: {
      getAuthorizationUrl: FunctionReference<
        "mutation",
        "internal",
        {
          callbackUrl?: string;
          errorRedirectTo?: string;
          provider: {
            accessType?: "offline" | "online";
            authorizationUrl: string;
            clientId: string;
            clientSecret: string;
            hostedDomain?: string;
            id: string;
            prompt?: "none" | "consent" | "select_account";
            runtimeConfig?: any;
            scopes: Array<string>;
            tokenEncryptionSecret?: string;
            tokenUrl: string;
            trustVerifiedEmail?: boolean;
            userInfoUrl: string;
          };
          redirectTo?: string;
          redirectUrl?: string;
        },
        any
      >;
      getCurrentUser: FunctionReference<
        "query",
        "internal",
        { checkBanned?: boolean; token: string },
        any
      >;
      getUserById: FunctionReference<
        "query",
        "internal",
        { checkBanned?: boolean; userId: string },
        any
      >;
      handleCallback: FunctionReference<
        "action",
        "internal",
        {
          callbackUrl?: string;
          code: string;
          defaultRole?: string;
          errorRedirectTo?: string;
          ipAddress?: string;
          provider: {
            accessType?: "offline" | "online";
            authorizationUrl: string;
            clientId: string;
            clientSecret: string;
            hostedDomain?: string;
            id: string;
            prompt?: "none" | "consent" | "select_account";
            runtimeConfig?: any;
            scopes: Array<string>;
            tokenEncryptionSecret?: string;
            tokenUrl: string;
            trustVerifiedEmail?: boolean;
            userInfoUrl: string;
          };
          redirectTo?: string;
          redirectUrl?: string;
          state: string;
          userAgent?: string;
        },
        any
      >;
      invalidateAllSessions: FunctionReference<
        "mutation",
        "internal",
        { userId: string },
        any
      >;
      invalidateSession: FunctionReference<
        "mutation",
        "internal",
        { token: string },
        any
      >;
      requestPasswordReset: FunctionReference<
        "mutation",
        "internal",
        { email: string; ipAddress?: string },
        any
      >;
      resetPassword: FunctionReference<
        "mutation",
        "internal",
        { code: string; email: string; newPassword: string },
        any
      >;
      signIn: FunctionReference<
        "mutation",
        "internal",
        {
          email: string;
          ipAddress?: string;
          password: string;
          requireEmailVerified?: boolean;
          userAgent?: string;
        },
        any
      >;
      signUp: FunctionReference<
        "mutation",
        "internal",
        {
          defaultRole?: string;
          email: string;
          ipAddress?: string;
          name?: string;
          password: string;
        },
        any
      >;
      validateSession: FunctionReference<
        "mutation",
        "internal",
        { checkBanned?: boolean; token: string },
        any
      >;
      verifyEmail: FunctionReference<
        "mutation",
        "internal",
        { code: string; email: string },
        any
      >;
    };
  };
  systemAdminComponent: {
    gateway: {
      banUser: FunctionReference<
        "mutation",
        "internal",
        {
          actorUserId: string;
          adminRole?: string;
          expiresAt?: number;
          reason?: string;
          userId: string;
        },
        any
      >;
      deleteUser: FunctionReference<
        "mutation",
        "internal",
        { actorUserId: string; adminRole?: string; userId: string },
        any
      >;
      isAdmin: FunctionReference<
        "query",
        "internal",
        { actorUserId: string; adminRole?: string },
        any
      >;
      listUsers: FunctionReference<
        "query",
        "internal",
        {
          actorUserId: string;
          adminRole?: string;
          cursor?: string;
          limit?: number;
        },
        any
      >;
      setRole: FunctionReference<
        "mutation",
        "internal",
        {
          actorUserId: string;
          adminRole?: string;
          role: string;
          userId: string;
        },
        any
      >;
      unbanUser: FunctionReference<
        "mutation",
        "internal",
        { actorUserId: string; adminRole?: string; userId: string },
        any
      >;
    };
  };
};
