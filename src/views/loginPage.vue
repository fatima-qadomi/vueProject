<template>
  <div
    class="flex justify-center items-center bg-gradient-to-r from-lightpurple to-lightpur min-h-screen"
  >
    <div
      class="flex bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-hidden"
    >
      <div class="w-1/2">
        <img
          src="@/assets/imgs/login-illustration.svg"
          alt="Login Illustration"
          class="w-full h-full object-contain"
        />
      </div>

      <div class="p-8 w-1/2 min-h-[450px]">
        <h2 class="mb-7 font-bold text-gray-700 text-3xl">Welcome Back!</h2>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-gray-600">Email Address</label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpur w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpur w-full"
              placeholder="Enter your password"
            />
          </div>

          <div v-if="errorMessage" class="mt-2 text-red-500 text-center">
            {{ errorMessage }}
          </div>

          <div>
            <button
              type="submit"
              class="bg-custompurple hover:bg-lightpur py-2 rounded-md w-full text-white transition duration-200"
            >
              Log In
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <a href="#" class="text-custompurple hover:text-lightpur"
            >Forgot your password?</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

// const handleLogin = async () => {
//   try {
//     const { data: users } = await axios.get("http://localhost:5000/users");

//     const user = users.find(
//       (u) => u.email === email.value && u.password === password.value
//     );

//     if (user) {
//       localStorage.setItem("currentUser", JSON.stringify(user));
//       router.push("/dashboard");
//     } else {
//       errorMessage.value = "Invalid email or password";
//     }
//   } catch (error) {
//     errorMessage.value = error.response?.data?.message || "An error occurred";
//   }
// };
const handleLogin = async () => {
  try {
    const { data: users } = await axios.get("http://localhost:5000/users");

    const user = users.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (user) {
      localStorage.setItem("userId", user.id);
      localStorage.setItem("currentUser", JSON.stringify(user));

      router.push("/dashboard"); 
    } else {
      errorMessage.value = "Invalid email or password";
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "An error occurred";
  }
};

</script>
