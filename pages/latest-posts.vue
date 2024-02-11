<template>
  <div>
    <BlogList :latest-posts="true"/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>
