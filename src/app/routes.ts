/* 
This file is used to define the public routes that are accessible to all users.


This file is used by the NextAuth middleware to determine which routes are public.
If a route is public, the user does not need to be authenticated to access it.

For example, routes that don't require authentication include:
- Homepage
- About page
- Contact form
- Login page
- Register page
- Password reset page
- Terms and conditions
- Privacy policy
- Cookie policy

If a route is private, the user must be authenticated to access it.

@type{string[]}
*/

export const publicRoutes = ["/"];

/*
   An array of routes that require authentication.
   
   @type{string[]}
   */

export const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

/*
   The prefix for all API routes.
   Routes that start with this prefix are considered API routes.
   @type{string}
   */

export const apiAuthPrefix = "/api/auth";

/*
   The default URL to redirect to after a user signs in.
   @type{string}
   */
export const DEFAULT_SIGNIN_URL = "/dashboard";
