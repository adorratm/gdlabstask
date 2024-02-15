import timeago from 'vue-timeago3';

export default defineNuxtPlugin({
    async setup(nuxtApp) {
    nuxtApp.vueApp.use(timeago)
    }
 }) 

