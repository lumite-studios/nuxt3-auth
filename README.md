# Laravel Sanctum Auth (API Tokens) for Nuxt 3

**Important Note:** This was built specifically for my own personal project and I cannot confirm if this will work for *any/every* project. Some changes may be necessary.

## Middleware
By default, all pages require auth. A page can be set for a guest by setting the auth variable in page meta to false. If you would like to "switch" this functionality, update the `true` default in the auth global middleware to `false`.
```js
definePageMeta({
    auth: false
})
```

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
