import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chat", () => {
  const messages = ref([]);

  // No backend fetching, start with an empty list
  const fetchMessages = () => {
    messages.value = [];
  };

  // Immediately push user message and AI response with no delay
  const sendMessage = (text) => {
    const userMsg = {
      id: Date.now(),
      role: "user",
      message: text,
    };
    messages.value.push(userMsg);

    const aiMsg = {
      id: Date.now() + 1,
      role: "ai",
      message: "I am an AI assistant!",
    };
    messages.value.push(aiMsg);
  };

  return { messages, fetchMessages, sendMessage };
});
