import { ref } from 'vue';

const apiUrl =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_URL_TEST
    : import.meta.env.VITE_URL_PRODUCTION;

export function useChat() {
  const message = ref('');
  const messageGuard = ref('');
  const messages = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const userName = ref('');

  async function initializeChat() {
    const userId = JSON.parse(localStorage.getItem('user_id'));

    if (!userId) {
      error.value = 'Usuário não encontrado.';
      return;
    }

    try {
      // Buscar dados do usuário
      const userResponse = await fetch(`${apiUrl}/user/get/${userId}`);
      const userText = await userResponse.text();
      const userData = JSON.parse(userText);

      if (!userResponse.ok) {
        throw new Error(userData.error || 'Erro ao buscar usuário.');
      }

      userName.value = userData.name || '';

      // Buscar histórico de mensagens
      const historyResponse = await fetch(`${apiUrl}/message/${userId}`);
      const historyText = await historyResponse.text();
      const historyData = JSON.parse(historyText);

      if (!historyResponse.ok) {
        throw new Error(historyData.error || 'Erro ao buscar histórico.');
      }

      if (historyData.dataHistory && historyData.dataHistory.length > 0) {
        messages.value = historyData.dataHistory;
      } else {
        // Mensagem inicial se não houver histórico
        messages.value = [
          {
            role: 'assistant',
            content: `Fala ${
              userName.value.split(' ')[0]
            }! Sou o Z3R4. Em que posso te ajudar hoje?`,
          },
        ];
      }
    } catch (err) {
      error.value = err.message || 'Erro ao inicializar o chat.';
    }
  }

  async function sendMessage() {
    if (!message.value.trim()) return;

    const userId = JSON.parse(localStorage.getItem('user_id'));

    if (!userId) {
      error.value = 'Usuário não encontrado.';
      return;
    }

    loading.value = true;
    error.value = null;

    const contentToSend = message.value; // 👈 SALVA o texto atual
    message.value = ''; // 👈 LIMPA o input imediatamente

    try {
      // Primeiro adiciona a mensagem do usuário na tela
      const userMessage = {
        role: 'user',
        content: contentToSend,
      };
      messages.value.push(userMessage);

      // Envia para o backend
      const response = await fetch(`${apiUrl}/message/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          content: contentToSend,
        }),
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem.');
      }

      // Mensagem da IA
      const assistantMessage = {
        role: 'assistant',
        content: data.response,
      };
      messages.value.push(assistantMessage);
    } catch (err) {
      error.value = err.message || 'Erro ao enviar mensagem.';
    } finally {
      loading.value = false;
    }
  }

  return {
    message,
    messages,
    messageGuard,
    loading,
    error,
    userName,
    sendMessage,
    initializeChat,
  };
}
