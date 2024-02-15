import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => reactive({
        posts: [] as Post[],
        latestPosts: [] as Post[],
        post: {} as Post,
    }),
    actions: {
        async fetchPosts(page: number | null, limit: number | null, search: string | null) {
            try {
                let url = useRuntimeConfig().public.API_URL + '/posts?_sort=id&_order=asc'
                if(page){
                    url += '&_page=' + page
                }
                if(limit){
                    url += '&_limit=' + limit
                }
                if(search){
                    url += '&q=' + search
                }
                const posts = await fetch(url)
                

                this.posts = await posts.json()

                for (const post of this.posts) {
                    const photo = await fetch(useRuntimeConfig().public.API_URL + '/albums/' + post.id + '/photos?_limit=1&_sort=id')
                    post.photo = await photo.json()
                    const user = await fetch(useRuntimeConfig().public.API_URL + '/users/' + post.userId)
                    post.user = await user.json()
                    post.userId = post.user.id
                }


            } catch (e) {
                console.error(e)
            }
        },
        async fetchLatestPosts() {
            try {
                const posts = await fetch(useRuntimeConfig().public.API_URL + '/posts?_limit=12&_page=1&_sort=id&_order=desc')

                this.latestPosts = await posts.json()

                for (const post of this.latestPosts) {
                    const photo = await fetch(useRuntimeConfig().public.API_URL + '/albums/' + post.id + '/photos?_limit=1&_sort=id')
                    post.photo = await photo.json()
                    const user = await fetch(useRuntimeConfig().public.API_URL + '/users/' + post.userId)
                    post.user = await user.json()
                    post.userId = post.user.id
                }


            } catch (e) {
                console.error(e)
            }
        },
        async fetchPost(id: number) {
            try {
                const post = await fetch(useRuntimeConfig().public.API_URL + '/posts/' + id)

                this.post = await post.json()

                const photos = await fetch(useRuntimeConfig().public.API_URL + '/albums/'+this.post.id+'/photos')
                this.post.photos = await photos.json()
                const user = await fetch(useRuntimeConfig().public.API_URL + '/users/' + this.post.userId)
                this.post.user = await user.json()
                this.post.userId = this.post.user.id
                const comments = await fetch(useRuntimeConfig().public.API_URL + '/posts/' + this.post.id + '/comments')
                this.post.comments = await comments.json()


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
    album: Album;
    photo: Photo[];
    user: User;
    photos: Photo[];
    comments: Comment[];
}

export interface Album {
    userId: number;
    id: number;
    title: string;
}

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}