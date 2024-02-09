<template>
  <div class="drawer" :class="isDrawerOpen ? 'drawer-open' : 'drawer-anan'">
    <input id="sidebar" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <AppHeader @open-drawer="openDrawer" isDrawerOpen/>
      <!-- Page content here -->
      <div class="container p-3 lg:p-8">
        <slot />
      </div>
    </div>
    <AppSidebar @close-drawer="closeDrawer" isDrawerOpen/>
  </div>
</template>

<script setup lang="ts">
const isDrawerOpen = ref(false);

const openDrawer = () => {
  isDrawerOpen.value = true;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};
</script>
