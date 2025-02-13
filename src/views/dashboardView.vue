<template>
  <div class="dashboard-container">
    <header class="flex justify-between items-center mb-6 p-6">
      <h1 class="font-semibold text-purpputusPruple text-3xl">Dashboard</h1>
    </header>

    <!-- Stats Section -->
    <section class="gap-6 grid grid-cols-1 sm:grid-cols-3">
      <div class="bg-purpputusPruple shadow-md p-6 rounded-lg text-white">
        <h3 class="font-semibold text-lg">Open Tickets</h3>
        <p class="font-bold text-3xl">{{ openTickets }}</p>
      </div>
      <div class="bg-purpputusPruple shadow-md p-6 rounded-lg text-white">
        <h3 class="font-semibold text-lg">In Progress</h3>
        <p class="font-bold text-3xl">{{ inProgressTickets }}</p>
      </div>
      <div class="bg-purpputusPruple shadow-md p-6 rounded-lg text-white">
        <h3 class="font-semibold text-lg">Resolved Tickets</h3>
        <p class="font-bold text-3xl">{{ resolvedTickets }}</p>
      </div>
    </section>

    <!-- Tickets List -->
    <section class="bg-white shadow-md mt-6 p-6 rounded-lg">
      <h2 class="mb-4 font-semibold text-gray-800 text-xl">Your Tickets</h2>

      <ul v-if="tickets.length > 0">
        <li
          v-for="ticket in tickets"
          :key="ticket.id"
          class="flex justify-between items-center py-4 border-b"
        >
          <div>
            <h3 class="font-semibold text-black text-lg">{{ ticket.title }}</h3>
            <p>
              Priority: <span class="font-medium">{{ ticket.priority }}</span>
            </p>
            <p>
              Status:
              <span :class="getStatusClass(ticket.status)">{{
                ticket.status
              }}</span>
            </p>
            <p class="text-black">Description: {{ ticket.description }}</p>
          </div>

          <div class="flex space-x-3">
            <i
              @click="openEditModal(ticket)"
              class="text-blue-600 hover:text-blue-800 cursor-pointer fas fa-edit"
            ></i>
            <i
              @click="openDeleteModal(ticket)"
              class="text-red-600 hover:text-red-800 cursor-pointer fas fa-trash"
            ></i>
          </div>
        </li>
      </ul>

      <p v-else class="mt-4 text-gray-500 text-center">No tickets available.</p>
    </section>

    <!-- Create Ticket Button -->
    <div class="mt-6 text-center">
      <router-link
        to="/create-ticket"
        class="bg-eminencePurple hover:bg-purpputusPruple shadow-md px-6 py-3 rounded-lg text-white"
      >
        Create New Ticket
      </router-link>
    </div>

    <!-- Edit Modal -->
    <EditTicketModal
      v-if="isEditModalVisible"
      :showModal="isEditModalVisible"
      :ticket="selectedTicket"
      @update-ticket="updateTicket"
      @close="closeEditModal"
    />

    <!-- Delete Modal -->
    <DeleteTicketModal
      v-if="isDeleteModalVisible"
      :isVisible="isDeleteModalVisible"
      :ticketId="selectedTicket?.id"
      @close="closeDeleteModal"
      @delete="deleteTicket"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import EditTicketModal from "@/components/EditTicketModal.vue";
import DeleteTicketModal from "@/components/DeleteTicketModal.vue";

const tickets = ref([]);
const openTickets = ref(0);
const inProgressTickets = ref(0);
const resolvedTickets = ref(0);
const isEditModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const selectedTicket = ref(null);

const fetchTickets = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    const response = await axios.get(
      `http://localhost:5000/tickets?userId=${userId}`
    );
    tickets.value = response.data;
    updateStats();
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
  }
};

onMounted(fetchTickets);

const updateStats = () => {
  openTickets.value = tickets.value.filter(
    (ticket) => ticket.status === "Pending"
  ).length;
  inProgressTickets.value = tickets.value.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;
  resolvedTickets.value = tickets.value.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;
};

const getStatusClass = (status) => {
  return status === "Pending"
    ? "text-red-600"
    : status === "In Progress"
    ? "text-yellow-500"
    : "text-green-600";
};

const openEditModal = (ticket) => {
  selectedTicket.value = { ...ticket };
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  selectedTicket.value = null;
};

const updateTicket = async (updatedTicket) => {
  try {
    await axios.put(
      `http://localhost:5000/tickets/${updatedTicket.id}`,
      updatedTicket
    );

    const index = tickets.value.findIndex(
      (ticket) => ticket.id === updatedTicket.id
    );
    if (index !== -1) {
      tickets.value[index] = updatedTicket;
    }

    updateStats();
    closeEditModal();
  } catch (error) {
    console.error("Failed to update ticket:", error);
  }
};

const openDeleteModal = (ticket) => {
  selectedTicket.value = ticket;
  isDeleteModalVisible.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalVisible.value = false;
  selectedTicket.value = null;
};

const deleteTicket = async (ticketId) => {
  try {
    await axios.delete(`http://localhost:5000/tickets/${ticketId}`);

    tickets.value = tickets.value.filter((ticket) => ticket.id !== ticketId);

    updateStats();
    closeDeleteModal();
  } catch (error) {
    console.error("Failed to delete ticket:", error);
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}
</style>
