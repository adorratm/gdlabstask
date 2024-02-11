<template>
  <div>
    <div class="flex flex-row flex-wrap">
      <div
        v-for="post in posts"
        :key="post.id"
        class="sm:basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4 mb-3"
      >
        <BlogCard :title="post.title" :description="post.body" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore, type Post } from "~/store";

const store = useMainStore();
const posts = ref<Post[]>([]);

onMounted(async () => {
  if(props.latestPosts) {
    await store.fetchLatestPosts();
    posts.value = store.latestPosts;
  } else {
    await store.fetchPosts();
    posts.value = store.posts;
  }
  
});

const props = defineProps({
  latestPosts: {
    type: Boolean,
    default: false,
  },
});
</script>
