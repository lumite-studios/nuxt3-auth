import { useAuth } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = to.meta.auth ?? true

    // required auth but user not logged in
    if(auth && !useAuth().isLoggedIn()) {
        return navigateTo('/')

    // required guest but user is logged in
    } else if(!auth && useAuth().isLoggedIn()) {
        return navigateTo('/dashboard')
    }
})
