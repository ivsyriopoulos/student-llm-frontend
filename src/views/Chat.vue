<!-- filepath: /C:/Users/micha/OneDrive - UvA/Block 3/DevOps/student-portal/src/views/Chat.vue -->
<template>
  <div class="chat-page">
    <!-- The scrollable messages area -->
    <div class="chat-messages">
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message"
        :class="bubbleClass(msg.role)"
      >
        {{ msg.message }}
      </div>
    </div>

    <!-- Sticky input at the bottom -->
    <div class="chat-input-area">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type a message..."
      />
      <button @click="sendMessage" class="send-btn">
        <!-- Paper plane icon -->
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#FFFFFF"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 21l21-9-21-9v7l15 2-15 2v7z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useChatStore } from "../stores/chat";
import { storeToRefs } from "pinia";

const chatStore = useChatStore();
const { messages } = storeToRefs(chatStore);
const newMessage = ref("");

onMounted(() => {
  chatStore.fetchMessages();
});

const sendMessage = async () => {
  if (newMessage.value.trim() !== "") {
    await chatStore.sendMessage(newMessage.value.trim());
    newMessage.value = "";
  }
};

/**
 * Bubbles are styled based on role:
 *   - 'ai' => left (grey)
 *   - 'user' => right (blue)
 */
const bubbleClass = (role) => {
  return role === "ai" ? "ai-message" : "user-message";
};
</script>

<style scoped>
/* The chat-page fills the parent's space (see App.vue) */
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Fills the entire viewport */
}

/* Scrollable messages area */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}

/* Common message styling */
.message {
  /* Restrict bubble width so text wraps */
  max-width: 60%;
  overflow-wrap: break-word; /* ensures long text wraps properly */
  white-space: pre-wrap; /* preserve newlines but wrap lines */
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.4;
}

/* AI (server) on the left */
.ai-message {
  align-self: flex-start;
  background: #e0e0e0;
  color: #333;
}

/* User on the right */
.user-message {
  align-self: flex-end;
  background: #007bff;
  color: #fff;
}

/* Sticky input bar pinned to the bottom */
.chat-input-area {
  position: sticky;
  bottom: 0;
  background: #fff;
  display: flex;
  border-top: 1px solid #ddd;
  padding: 10px;
}

/* Full-width text input */
.chat-input-area input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  padding: 10px;
  font-size: 16px;
}

/* Send button is small on the right */
.send-btn {
  width: 50px;
  background: #007bff;
  border: none;
  border-radius: 0 5px 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.send-btn:hover {
  background: #0056b3;
}
</style>
