<template>
  <div>
    <BlogList :search-tag="searchTag"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const route = useRoute();

const searchTag = route.params.id as string;

</script>


  