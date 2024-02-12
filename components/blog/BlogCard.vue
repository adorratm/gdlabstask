<template>
    <div class="card h-full flex w-100 mx-3 bg-base-100 shadow-xl">
      <figure class="z-0">
        <NuxtImg class="w-full" v-if="image" :src="image" :alt="title" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ title }}</h2>
        <p class=" text-clip ...">{{ description.slice(0,100) }}...</p>
        <div class="card-actions justify-end">
          <NuxtLink :to="'/blogs/'+id" class="btn btn-primary">Read More</NuxtLink>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});
</script>
