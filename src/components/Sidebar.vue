<template>
  <div>
    <button
      @click="isSidebarOpen = !isSidebarOpen"
      class="lg:hidden z-50 fixed bg-purpputusPruple m-2 p-2 rounded text-white"
    >
      ☰
    </button>

    <aside
      class="fixed bg-gradient-to-r from-purpputusPruple to-pinkLavender p-6 w-64 h-screen text-white transition-transform -translate-x-full lg:translate-x-0 duration-300 transform"
      :class="{ 'translate-x-0': isSidebarOpen }"
    >
      <div class="flex justify-between items-center mb-6">
        <h1 class="font-bold text-xl">IT Support</h1>
      </div>

      <nav class="mt-6">
        <RouterLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center hover:bg-purpputusPruple p-3 rounded-lg transition"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span class="ml-3">{{ item.name }}</span>
        </RouterLink>
      </nav>

      <div class="right-0 bottom-6 left-0 absolute px-6">
        <button
          @click="logout"
          class="flex justify-center items-center bg-eminencePurple hover:bg-lightpurple py-2 rounded w-full text-center transition-colors"
        >
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <div class="lg:ml-64 p-6 w-full transition-all duration-300">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const isSidebarOpen = ref(false);

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "🏠" },
  { name: "Create Ticket", path: "/create-ticket", icon: "🎫" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

const logout = () => {
  localStorage.removeItem("currentUser");
  router.push("/login");
};
</script>