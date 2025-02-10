<template>
  <div class="flex justify-center items-center bg-gradient-to-r from-lightpurple to-lightpur min-h-screen">
    <div class="flex bg-white shadow-lg rounded-lg w-full max-w-4xl overflow-hidden">
      <div class="w-1/2">
        <img src="@/assets/imgs/sign-up.png" alt="Signup Illustration" class="w-full h-full object-contain" />
      </div>

      <div class="p-8 w-1/2 min-h-[450px]">
        <h2 class="mb-7 font-bold text-gray-700 text-3xl">Create Your Account</h2>

        <form @submit.prevent="handleSignUp" class="space-y-6">
          <div>
            <label for="name" class="block text-gray-600">Name</label>
            <input id="name" type="text" v-model="name" required class="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpur w-full" placeholder="Enter your name" />
          </div>

          <div>
            <label for="email" class="block text-gray-600">Email Address</label>
            <input id="email" type="email" v-model="email" required class="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpur w-full" placeholder="Enter your email" />
          </div>

          <div>
            <label for="password" class="block text-gray-600">Password</label>
            <input id="password" type="password" v-model="password" required class="mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightpur w-full" placeholder="Enter your password" />
          </div>

          <div>
            <button type="submit" class="bg-custompurple hover:bg-lightpur py-2 rounded-md w-full text-white transition duration-200">
              Sign Up
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <router-link to="/login" class="text-custompurple hover:text-lightpur">Already have an account? Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios"; 

const name = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();



const handleSignUp = async () => {
  try {
    const response = await axios.post("http://localhost:5000/users", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (response.status === 201) {
      router.push("/login");
    }
  } catch (error) {
    console.error(error.response?.data?.message || "An error occurred");
  }
};

</script>
