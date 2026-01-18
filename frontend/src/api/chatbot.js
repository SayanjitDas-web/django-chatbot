import api from './axios';

export const chatbotAPI = {
  // Send a chat message
  sendMessage: async (message) => {
    const response = await api.post('/chatbot/chat/', { message });
    return response.data;
  },

  // Get chat history
  getHistory: async () => {
    const response = await api.get('/chatbot/history/');
    return response.data;
  },
};
