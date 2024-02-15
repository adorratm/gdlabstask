<template>
  <div>
    <div class="card w-100 bg-base-100 shadow-xl">
      <figure v-if="post.photos && post.photos.length > 0">
        <Carousel :items-to-show="1" :autoplay="5000">
          <Slide :key="index" v-for="(photo, index) in post.photos">
            <div class="carousel__item w-full">
              <NuxtImg :src="photo.url" :alt="photo.title" class="w-full" />
            </div>
          </Slide>
          <template #addons>
            <navigation />
            <pagination class="flex-wrap" />
          </template>
        </Carousel>
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ post.title }}
        </h2>
        <p>{{ post.body }}</p>
        <div class="card-actions items-center border-t-2 pt-2">
          <div class="flex-1 items-center" v-if="post.user">
            <div class="flex items-center">
              <NuxtImg
                v-if="post.user && post.photos.length"
                class="w-12 rounded-full border-2 mr-4"
                :src="'https://api.dicebear.com/7.x/lorelei/svg?seed='+post.user.username"
                :alt="post.user.username"
              />
              <div class="text-sm">
                <p class="text-gray-900 leading-none">
                  <NuxtLink target="_blank" :to="'https://' + post.user.website"
                    >@{{ post.user.username }}</NuxtLink
                  >
                </p>
                <p class="text-gray-600">
                  <NuxtLink :to="'https://' + post.user.website" target="_blank">{{
                    post.user.website
                  }}</NuxtLink>
                </p>
              </div>
            </div>
          </div>
          <div class="justify-end flex-wrap">
            <div
              class="badge badge-outline ms-1"
              v-for="splittedName in post.title?.split(' ')"
            >
              <NuxtLink :to="'/blogs/search/' + splittedName">{{
                splittedName
              }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card w-100 bg-base-200 shadow-xl mt-4">
      <div class="card-body">
        <h2 class="card-title">Comments</h2>
        <BlogComments v-if="post.comments" :comments="post.comments" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore,type Post } from '~/store';
  definePageMeta({
    layout: 'main'
  })

  const store = useMainStore();
  const route = useRoute();
  const postId = parseInt(route.params.id as string);
  const post = ref<Post>({} as Post);

  onMounted(async () => {
    await store.fetchPost(postId);
    post.value = store.post;
  });
</script>
