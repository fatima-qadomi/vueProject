<template>
  <div class="flex justify-center items-center bg-gray-100 p-6 min-h-screen">
    <div class="bg-white shadow-lg p-8 rounded-lg w-full max-w-2xl">
      <h2 class="mb-4 font-semibold text-gray-800 text-2xl text-center">
        Create a New Ticket
      </h2>

      <form @submit.prevent="submitTicket" class="space-y-4">
        <div>
          <label class="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            v-model="ticket.title"
            required
            class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-eminencePurple focus:ring-2 w-full"
          />
        </div>

        <div>
          <label class="block font-medium text-gray-700">Priority</label>
          <select
            v-model="ticket.priority"
            required
            class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-eminencePurple focus:ring-2 w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label class="block font-medium text-gray-700">Status</label>
          <select
            v-model="ticket.status"
            required
            class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-eminencePurple focus:ring-2 w-full"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label class="block font-medium text-gray-700">Description</label>
          <textarea
            v-model="ticket.description"
            required
            class="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-eminencePurple focus:ring-2 w-full"
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-eminencePurple hover:bg-purpputusPruple px-6 py-3 rounded-lg w-full font-semibold text-white transition duration-300"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { ref } from "vue";

// export default {
//   setup() {
//     const ticket = ref({
//       title: "",
//       priority: "Medium",
//       description: "",
//       status: "Pending",
//     });

//     const router = useRouter();

//     const submitTicket = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/tickets",
//           ticket.value
//         );
//         console.log("Ticket created:", response.data);

//         router.push("/dashboard");
//       } catch (error) {
//         console.error("Failed to create ticket:", error);
//       }
//     };

//     return { ticket, submitTicket };
//   },
// };
export default {
  setup() {
    const ticket = ref({
      title: "",
      priority: "Medium",
      description: "",
      status: "Pending",
      userId: localStorage.getItem("userId"), 
    });

    const router = useRouter();

    const submitTicket = async () => {
      try {
        const userId = localStorage.getItem("userId"); // جلب معرف المستخدم
        if (!userId) {
          console.error("User ID not found");
          return;
        }

        const newTicket = {
          ...ticket.value,
          userId, // إضافة userId إلى التذكرة
        };

        const response = await axios.post(
          "http://localhost:5000/tickets",
          newTicket
        );
        console.log("Ticket created:", response.data);

        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to create ticket:", error);
      }
    };

    return { ticket, submitTicket };
  },
};
</script>
