<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 modal-overlay"
  >
    <div class="bg-white shadow-lg p-6 rounded-lg w-1/3 modal-content">
      <h3 class="font-semibold text-lg">Edit Ticket</h3>

      <form @submit.prevent="updateTicket">
        <div>
          <label for="title">Title</label>
          <input
            type="text"
            v-model="editedTicket.title"
            required
            class="p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label for="priority">Priority</label>
          <select
            v-model="editedTicket.priority"
            required
            class="p-3 border border-gray-300 rounded-md w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label for="status">Status</label>
          <select
            v-model="editedTicket.status"
            required
            class="p-3 border border-gray-300 rounded-md w-full"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label for="description">Description</label>
          <textarea
            v-model="editedTicket.description"
            required
            class="p-3 border border-gray-300 rounded-md w-full"
            rows="4"
          ></textarea>
        </div>

        <div class="flex justify-end gap-4 mt-4">
          <button
            type="submit"
            class="bg-eminencePurple hover:bg-purpputusPruple px-6 py-3 rounded-lg text-white"
          >
            Update Ticket
          </button>
          <button
            @click="closeModal"
            type="button"
            class="bg-red-600 px-4 py-3 rounded-lg text-white"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    showModal: Boolean,
    ticket: Object,
  },
  data() {
    return {
      editedTicket: { ...this.ticket },
    };
  },
  methods: {
    updateTicket() {
      console.log("Ticket Updated:", this.editedTicket);
      this.$emit("update-ticket", this.editedTicket);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
  
  <style scoped>
</style>
  