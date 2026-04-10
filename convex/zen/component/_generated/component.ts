/* eslint-disable */
/**
 * Generated `ComponentApi` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { FunctionReference } from "convex/server";

/**
 * A utility for referencing a Convex component's exposed API.
 *
 * Useful when expecting a parameter like `components.myComponent`.
 * Usage:
 * ```ts
 * async function myFunction(ctx: QueryCtx, component: ComponentApi) {
 *   return ctx.runQuery(component.someFile.someQuery, { ...args });
 * }
 * ```
 */
export type ComponentApi<Name extends string | undefined = string | undefined> =
  {
    gateway: {
      getCurrentUser: FunctionReference<
        "query",
        "internal",
        { checkBanned?: boolean; token: string },
        any,
        Name
      >;
      getUserById: FunctionReference<
        "query",
        "internal",
        { checkBanned?: boolean; userId: string },
        any,
        Name
      >;
      invalidateAllSessions: FunctionReference<
        "mutation",
        "internal",
        { userId: string },
        any,
        Name
      >;
      invalidateSession: FunctionReference<
        "mutation",
        "internal",
        { token: string },
        any,
        Name
      >;
      requestPasswordReset: FunctionReference<
        "mutation",
        "internal",
        { email: string; ipAddress?: string },
        any,
        Name
      >;
      resetPassword: FunctionReference<
        "mutation",
        "internal",
        { code: string; email: string; newPassword: string },
        any,
        Name
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
        any,
        Name
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
        any,
        Name
      >;
      validateSession: FunctionReference<
        "mutation",
        "internal",
        { checkBanned?: boolean; token: string },
        any,
        Name
      >;
      verifyEmail: FunctionReference<
        "mutation",
        "internal",
        { code: string; email: string },
        any,
        Name
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
          any,
          Name
        >;
        deleteUser: FunctionReference<
          "mutation",
          "internal",
          { adminRole?: string; userId: string },
          any,
          Name
        >;
        isAdmin: FunctionReference<
          "query",
          "internal",
          { adminRole?: string },
          any,
          Name
        >;
        listUsers: FunctionReference<
          "query",
          "internal",
          { adminRole?: string; cursor?: string; limit?: number },
          any,
          Name
        >;
        setRole: FunctionReference<
          "mutation",
          "internal",
          { adminRole?: string; role: string; userId: string },
          any,
          Name
        >;
        unbanUser: FunctionReference<
          "mutation",
          "internal",
          { adminRole?: string; userId: string },
          any,
          Name
        >;
      };
    };
  };
