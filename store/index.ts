import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => reactive({
        posts: [] as Post[],
        latestPosts: [] as Post[],
    }),
    actions: {
        async fetchPosts() {
            try {
                const response = await fetch(useRuntimeConfig().public.API_URL + '/posts')
                this.posts = await response.json()
            } catch (e) {
                console.error(e)
            }
        },
        async fetchLatestPosts() {
            try {
                const response = await fetch(useRuntimeConfig().public.API_URL + '/posts?_limit=12&_sort=id&_order=desc')
                this.latestPosts = await response.json()
            } catch (e) {
                console.error(e)
            }
        },
    },
})

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}