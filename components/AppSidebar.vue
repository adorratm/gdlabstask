<template>
  <div class="drawer-side z-50">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-300 text-base-content">
      <!-- Sidebar content here -->
      <li><NuxtLink to="/" title="Home"><Icon name="mdi:home" size="2em" />Home</NuxtLink></li>
      <li><NuxtLink to="/latest-posts" title="Latest Posts"><Icon name="mdi:blog" size="2em" />Latest Posts</NuxtLink></li>
    </ul>
  </div>
</template>
