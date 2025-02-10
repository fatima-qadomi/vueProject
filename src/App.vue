<template>
  <div class="flex h-screen">
    <!-- Conditionally render Sidebar -->
    <Sidebar v-if="showSidebar" class="bg-gray-800 w-64 text-white" />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "./components/Sidebar.vue";

const showSidebar = ref(true);

const route = useRoute();

watch(route, (newRoute) => {
  if (newRoute.name === "login" || newRoute.name === "signup") {
    showSidebar.value = false;
  } else {
    showSidebar.value = true;
  }
});
</script>
