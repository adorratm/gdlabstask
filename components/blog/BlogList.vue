<template>
  <div>
    <div class="flex flex-row flex-wrap">
      <div
        v-for="post in posts"
        :key="post.id"
        class="sm:basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4 mb-3"
      >
        <BlogCard :id="post.id" :title="post.title" :description="post.body" :image="post.photo[0]?.url" />
      </div>
    </div>
    <button class="flex justify-center my-5 btn btn-error text-white mx-auto" v-if="!latestPosts && posts.length" @click="loadMore"><Icon name="gg:spinner" v-if="loadSpinner" class="animate-spin" />Load More</button>
  </div>
</template>

<script setup lang="ts">
import { useMainStore, type Post } from "~/store";

const store = useMainStore();

const props = defineProps({
  latestPosts: {
    type: Boolean,
    default: false,
  },
  searchTag:{
    type: String,
  }
});

const posts = ref<Post[]>([]);

const postsPerPage = 12;

const currentPage = ref(1);

const loadSpinner = ref(false);


onMounted(async () => {
  if(props.latestPosts) {
    await store.fetchLatestPosts();
    posts.value = store.latestPosts;

  } else {
    await store.fetchPosts(currentPage.value, postsPerPage, props.searchTag ?? null);
    
    posts.value = store.posts.slice(0, postsPerPage);
  }
  
});

const loadMore = async () => {
    currentPage.value++;
    loadSpinner.value = true;
    await store.fetchPosts(currentPage.value++,postsPerPage,props.searchTag ?? null);
    posts.value = [...posts.value, ...store.posts.slice(0, postsPerPage)];
    loadSpinner.value = false;
  };

</script>
