<template>
  <div class="drawer bg-base-200" :class="drawerToggle ? 'lg:drawer-open' :null">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" v-model="drawerToggle" />
    <div class="drawer-content bg-base-200">
      <AppHeader />
      <!-- Page content here -->
      <div class="container mx-auto p-4">
        <slot />
      </div>
    </div>
    <AppSidebar />
  </div>
</template>

<script setup lang="ts">
const drawerToggle = ref(false);

useHead({
  bodyAttrs: {
    class: 'bg-base-200 h-dvh'
  }
})
</script>
