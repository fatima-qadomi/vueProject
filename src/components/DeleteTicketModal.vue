<template>
    <div
      v-if="isVisible"
      class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50"
    >
      <div class="bg-white shadow-lg p-6 rounded-lg w-96">
        <h2 class="mb-4 font-semibold text-red-600 text-xl">Delete Ticket</h2>
        <p class="mb-4">Are you sure you want to delete this ticket?</p>
        <div class="flex justify-between">
          <button
            @click="closeModal"
            class="bg-gray-500 px-4 py-2 rounded-md text-white"
          >
            Cancel
          </button>
          <button
            @click="deleteTicket"
            class="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true,
    },
    ticketId: {
      type: Number,
      required: true,
    },
  });
  
  const emit = defineEmits(["close", "delete"]);
  
  const deleteTicket = async () => {
    try {
      await axios.delete(`http://localhost:5000/tickets/${props.ticketId}`);
      emit("delete", props.ticketId); 
      closeModal();
    } catch (error) {
      console.error("Failed to delete ticket:", error);
    }
  };
  
  const closeModal = () => {
    emit("close");
  };
  </script>
  
  <style scoped>
  </style>
  