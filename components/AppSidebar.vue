<template>
  <div class="drawer-side">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay" @click="closeDrawer"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <!-- Sidebar content here -->
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      
    </ul>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close-drawer']);
const closeDrawer = () => {
  // drawer'ı kapatmak için event emit et
  emit('close-drawer');
};
</script>