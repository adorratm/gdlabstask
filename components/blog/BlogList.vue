<template>
  <div>
    <div class="flex flex-row flex-wrap">
      <div v-for="post in posts" :key="post.id" class="sm:basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4 mb-3">
        <BlogCard :title="post.title" :description="post.body" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const props = defineProps({
  latestPosts: {
    type: Boolean,
    default: false,
  },
});

const posts = ref([]);
const albums = ref([]);
const perPage = 12;
let currentPage = ref(1);


const getLatestPosts = async () => {
  try {
    const response = await fetch(`${runtimeConfig.public.API_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    posts.value = await response.json();
    if (props.latestPosts) {
      posts.value = posts.value.reverse();
      posts.value = posts.value.slice(0, 12);
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchPosts = async () => {
  try {
    const response = await fetch(
      `${runtimeConfig.public.API_URL}/posts?_page=${currentPage.value}&_limit=${perPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    posts.value = posts.value.concat(await response.json());
    currentPage.value++;
  } catch (e) {
    console.log(e);
  }
};

const fetchAlbums = async () => {
  try {
    for (let i = 0; i < posts.value.length; i++) {
      const response = await fetch(
        `${runtimeConfig.public.API_URL}/albums/${posts.value[i].id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      albums.value = albums.value.concat(await response.json());
    }
  } catch (e) {
    console.log(e);
  }
};

if (props.latestPosts) {
  await getLatestPosts();
} else {
  await fetchPosts();
}
</script>
