<script setup>
import { useChat } from '../composables/chat';
import { ref, watch, nextTick, onMounted } from 'vue';

const { message, messages, messageGuard, loading, error, sendMessage: originalSendMessage, initializeChat } = useChat();
const messageInput = ref(null);

onMounted(() => {
  initializeChat();
});
// Função ajusta a altura do textarea conforme o texto cresce
function adjustTextareaHeight() {
  const el = messageInput.value;
  if (el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
}

// Formatar a mensagem (negrito e quebra de linha)
function formatMessage(text) {
  if (!text) return '';
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\n/g, '<br>');
  return formatted;
}

// Scroll para o final do chat
function scrollToBottom() {
  nextTick(() => {
    const chatArea = document.getElementById('chat-messages');
    if (chatArea) {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  });
}

// Corrigido: função própria para enviar mensagem e scrollar após resposta
async function sendMessage() {
  await originalSendMessage();  // Aguarda envio da mensagem e resposta
  scrollToBottom();             // Só scrolla depois que tudo foi atualizado
}

// Quando montar, já scrolla para o final
onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="flex h-screen bg-zBlack overflow-hidden">
    
    <!-- Lado esquerdo fixo -->
    <aside class="hidden lg:flex flex-col w-1/3 bg-zBlack border-r border-zYellow p-6 space-y-6">
      <div class="flex items-center space-x-2">
        <img src="@/assets/logo-furia.png" alt="Logo Furia" class="h-12" />
        <h1 class="text-3xl font-bold text-zYellow">Z3R4</h1>
      </div>
      <div class="space-y-2 text-sm text-zLightGray">
        <p>Cada letra e número do nome carrega um valor da identidade <span class="text-zYellow">FURIOSA:</span></p>
        <p><span class="text-zYellow font-bold">Z</span> - Zona de Conhecimento: Domínio da cultura da FURIA.</p>
        <p><span class="text-zYellow font-bold">3</span> - Três Forças: Desejo, Garra e Estratégia.</p>
        <p><span class="text-zYellow font-bold">R</span> - Reconhecimento e Respeito: Valoriza o torcedor.</p>
        <p><span class="text-zYellow font-bold">4</span> - Força dos Quatro Pilares: Performance, Business, Tecnologia e Social.</p>
      </div>
      <p class="text-zYellow font-bold text-lg mt-6">QUEM VIVE O JOGO, ENTENDE O JOGO.</p>
      <router-link to="/" class="bg-zLightGray w-[50%] flex justify-center rounded-xl text-zBlack">Sair do Z3R4</router-link>
    </aside>

    <!-- Área de chat -->
    <section class="flex-1 flex flex-col relative bg-zChatGreyLeft">

      <!-- Mensagens -->
      <div id="chat-messages" class="flex-1 overflow-y-auto px-4 pt-6 pb-32 space-y-4">
        <transition-group name="fade" tag="div">
          <div v-for="(msg, index) in messages" :key="index" class="w-full">
            <!-- Mensagem da IA -->
            <div v-if="msg.role === 'assistant'" class="text-left">
              <div v-html="formatMessage(msg.content)" class="text-zWhite text-[2.4vh] p-4 rounded-2xl max-w-2xl"></div>
            </div>
            <!-- Mensagem do Usuário -->
            <div v-else class="text-right">
              <div class="bg-zChatGreyMedium text-zWhite text-[2.4vh] p-4 rounded-2xl inline-block max-w-xs ml-auto whitespace-pre-line">
                {{ msg.content }}
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Input -->
      <div class="absolute bottom-0 left-0 right-0 p-3 mx-10 rounded-[100px] bg-zChatGreyInput border-t border-zDarkGray">
        <form @submit.prevent="sendMessage" class="flex items-center gap-2">
          <textarea
            v-model="message"
            ref="messageInput"
            @input="adjustTextareaHeight"
            @keydown.enter.exact.prevent="sendMessage"
            placeholder="Digite sua mensagem..."
            rows="1"
            class="flex-1 resize-none bg-transparent focus:outline-none text-sm text-zWhite placeholder-zLightGray p-3 max-h-40 overflow-y-auto rounded-lg"
          ></textarea>
          <button type="submit" :disabled="loading || !message.trim()" class="flex items-center justify-center h-10 w-10">
            <img src="@/assets/btn-send-input.svg" alt="Enviar" class="h-6 w-6" />
          </button>
        </form>
        <div v-if="error" class="text-red-500 text-xs mt-2">{{ error }}</div>
      </div>
      

    </section>
  </div>
</template>

<style scoped>
/* Fade das mensagens */
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #FFA800;
  border-radius: 3px;
}
</style>
