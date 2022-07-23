import { useAuth } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
    const store = useAuth()
    store.init()
    nuxtApp.provide('auth', store)
})
