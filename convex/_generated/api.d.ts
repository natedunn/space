/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as documents from "../documents.js";
import type * as site from "../site.js";
import type * as zen__generated_auth from "../zen/_generated/auth.js";
import type * as zen__generated_meta from "../zen/_generated/meta.js";
import type * as zen_core from "../zen/core.js";
import type * as zen_plugin_systemAdmin from "../zen/plugin/systemAdmin.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  documents: typeof documents;
  site: typeof site;
  "zen/_generated/auth": typeof zen__generated_auth;
  "zen/_generated/meta": typeof zen__generated_meta;
  "zen/core": typeof zen_core;
  "zen/plugin/systemAdmin": typeof zen_plugin_systemAdmin;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  zenComponent: {
    gateway: {
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
    systemAdmin: {
      gateway: {
        banUser: FunctionReference<
          "mutation",
          "internal",
          {
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
          { adminRole?: string; userId: string },
          any
        >;
        isAdmin: FunctionReference<
          "query",
          "internal",
          { adminRole?: string },
          any
        >;
        listUsers: FunctionReference<
          "query",
          "internal",
          { adminRole?: string; cursor?: string; limit?: number },
          any
        >;
        setRole: FunctionReference<
          "mutation",
          "internal",
          { adminRole?: string; role: string; userId: string },
          any
        >;
        unbanUser: FunctionReference<
          "mutation",
          "internal",
          { adminRole?: string; userId: string },
          any
        >;
      };
    };
  };
};
