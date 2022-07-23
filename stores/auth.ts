import { defineStore } from 'pinia'
import { RouteLocationRaw, NavigationFailure } from 'vue-router'

export const useAuth = defineStore({
    id: 'auth',

    state: () => {
        return {
            authRoute: '/auth',
            authProperty: 'data',
            csrfCookie: 'XSRF-TOKEN',
            csrfRoute: '/sanctum/csrf-cookie',
            loggingIn: false,
            loginCookie: 'token',
            loginRoute: '/account/login',
            loginProperty: 'data',
            user: null
        }
    },

    actions: {
        /**
         * 1. Check if a CSRF cookie exists, and set it
         * if it doesn't.
         * 2. Check if a login cookie exists, and if it
         * does try logging the user in.
         * @return {void}
         */
        init(): void {
            this.checkCSRFCookie()

            if(this.isLoggedIn()) {
                this.loggingIn = true
                this.fetchUser()
            }
        },

        /**
         * Check if a CSRF cookie exists, and set
         * it if it doesn't.
         * @return {void}
         */
        checkCSRFCookie(): void {
            if(!this.hasCSRFCookie()) {
                this.setCSRFCookie()
            }
            return
        },

        /**
         * Check if a CSRF cookie exists.
         * @return {boolean}
         */
        hasCSRFCookie(): boolean {
            return typeof useCookie(this.csrfCookie).value !== 'undefined'
        },

        /**
         * Set a CSRF cookie.
         * @return {void}
         */
        setCSRFCookie(): void {
            fetch(this.csrfRoute, {
                method: 'GET'
            })
        },

        /**
         * Check if the auth is logged in.
         * @return {boolean}
         */
        isLoggedIn(): boolean {
            return typeof useCookie(this.loginCookie).value !== 'undefined'
        },

        /**
         * Attempt to login a user.
         * @param {data}
         * @return {Promise}
         */
        login(data): Promise<void> {
            this.loggingIn = true

            return fetch(this.loginRoute, {
                method: 'POST',
                body: data
            }).then((response) => {
                this.setLoginCookie(response[this.loginProperty])
                nextTick(() => {
                    this.fetchUser()
                    return navigateTo('/dashboard')
                })
            })
        },

        /**
         * Set the login cookie.
         * @param {id}
         * @return {void}
         */
        setLoginCookie(id: any): void {
            const cookie = useCookie(this.loginCookie)
            cookie.value = id
        },

        /**
         * Fetch the user.
         * @return {Promise}
         */
        fetchUser(): Promise<void> {
            return fetch(this.authRoute, {
                method: 'GET'
            }).then((response) => {
                this.loggingIn = false
                this.user = response[this.authProperty]
            })
        },

        /**
         * Log the user out.
         * @return {RouteLocationRaw|Promise<void|NavigationFailure>}
         */
        logout(): RouteLocationRaw|Promise<void|NavigationFailure> {
            this.clearCookies()
            this.user = {}
            return navigateTo('/')
        },

        /**
         * Clear the cookies.
         * @return {void}
         */
        clearCookies(): void {
            const csrfCookie = useCookie(this.csrfCookie)
            const loginCookie = useCookie(this.loginCookie)
            csrfCookie.value = undefined
            loginCookie.value = undefined
        },

        /**
         * Get the login cookie.
         * @return {any}
         */
        getLoginCookie(): any {
            return useCookie(this.loginCookie)
        },
    },
})
