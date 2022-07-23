# Laravel Sanctum Auth (API Tokens) for Nuxt 3

**Important Note:** This was built specifically for my own personal project and I cannot confirm if this will work for *any/every* project. Some changes may be necessary.

## Laravel API Server
1. Laravel Sanctum needs to be added to the build set the csrf cookie and handle the API tokens.
2. The login route should return an API token created with something like `user()->createToken(...)`.
3. The auth route should return the authenticated user `auth()->guard('sanctum')->user()`.

## Middleware
By default, all pages require auth. A page can be set for a guest by setting the auth variable in page meta to false. If you would like to "switch" this functionality, update the `true` default in the middleware itself to `false`.
```js
definePageMeta({
    auth: false
})
```
You may also need to update the middleware navigation routes. It defaults to a guest is redirected to `/` and an authenticated user is redirected to `/dashboard`.

## Layouts
It's recommended in the layout to check if auth is currently attempting a login before showing, to ensure the user object in the store is properly set.

## Stores
The auth store has a few different properties that can be customised as needed.
* **authRoute:** The route to use to fetch the authenticated user.
* **authProperty:** The property returned in the authRoute response to be used to set the user.
* **csrfRoute:** The route to use to fetch the csrf cookie.
* **loginRoute:** The route to use to attempt to login the user.
* **loginProperty:** The property returned in the loginRoute response to be used as the api token.

## Plugins
The `auth` plugin allows the use of the store throughout the application.
```js
const { $auth } = useNuxtApp()
```
