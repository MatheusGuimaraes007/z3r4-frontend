<script setup>
import { useRegister } from '../composables/useRegister'

const { firstName, lastName, email, password, confirmPassword, loading, error, redirect, msgPassword, register } = useRegister()

</script>

<template>
  <div class="min-h-screen bg-zBlack flex flex-col lg:flex-row">
    <!-- Imagem desktop
    <div class="hidden lg:flex w-3/4 h-screen">
      <img src="@/assets/furia-team.png" alt="Time Furia" class="object-cover w-full h-full" />
    </div> -->

    <!-- Formulário -->
    <div v-if="!redirect" class="flex flex-1 flex-col items-center justify-center px-4 text-zWhite bg-zBlack">
      <img src="@/assets/logo-furia.png" alt="Logo Furia" class="w-1/4 h-auto mb-3 mt-1" />

      <div class="w-full max-w-sm bg-zDarkGray p-6 rounded-lg shadow-md flex flex-col items-center">
        <img src="@/assets/logo-z3r4.png" alt="Z3R4" class="w-1/3 h-auto mb-2" />

        <p class="text-center text-lg text-zLightGray mb-6">
          Entre no servidor. O <span class="text-zYellow font-bold">Z3R4</span> tá online e pronto pra trocar aquela ideia sobre o time de CS:GO.
        </p>

        <form @submit.prevent="register" class="flex flex-col gap-4 w-full">
          <div>
            <label class="block text-zLightGray text-sm mb-1">Primeiro Nome:</label>
            <input 
              v-model="firstName" 
              type="text" 
              placeholder="Digite seu primeiro nome"
              class="w-full p-2 rounded-full text-sm bg-transparent border border-zYellow text-zWhite placeholder-zLightGray focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-zLightGray text-sm mb-1">Segundo Nome:</label>
            <input 
              v-model="lastName" 
              type="text" 
              placeholder="Digite seu sobrenome"
              class="w-full p-2 rounded-full text-sm bg-transparent border border-zYellow text-zWhite placeholder-zLightGray focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-zLightGray text-sm mb-1">Email:</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Digite seu email"
              class="w-full p-2 text-sm rounded-full bg-transparent border border-zYellow text-zWhite placeholder-zLightGray focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-zLightGray text-sm mb-1">Senha:</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Digite sua senha"
              class="w-full p-2 rounded-full text-sm bg-transparent border border-zYellow text-zWhite placeholder-zLightGray focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-zLightGray text-sm mb-1">Confirmar Senha:</label>
            <input 
              v-model="confirmPassword" 
              type="password" 
              placeholder="Confirme sua senha"
              class="w-full p-2 rounded-full text-sm bg-transparent border border-zYellow text-zWhite placeholder-zLightGray focus:outline-none"
            />
            <p v-if="msgPassword" class="text-red-500 text-xs mt-1">{{ msgPassword }}</p>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="bg-zYellow text-zBlack font-bold py-2 rounded-full hover:opacity-90 transition disabled:opacity-50 w-[50%] place-self-center"
          >
            {{ loading ? 'Criando...' : 'Criar Conta' }}
          </button>

          <p v-if="error" class="text-red-500 text-center text-sm">{{ error }}</p>
        </form>

        <p class="text-xs text-zLightGray text-center mt-4">
          Já possui uma conta? Acesse <router-link to="/" class="text-zYellow underline">Aqui</router-link>
        </p>
      </div>

      <div class="text-center text-zLightGray text-xs mt-2 px-2 max-w-sm">
        <p>
          <span class="text-zYellow font-bold">Z3R4</span> conecta você ao universo da FURIA:
        </p>
        <p>escalações, estatísticas e histórias do CS:GO.</p>
        <p>Informação rápida e alma de arquibancada.</p>
        <p class="text-zYellow mt-2 mb-4 font-bold">#DIADEFURIA</p>
      </div>
    </div>
    <div v-if="redirect" class="flex flex-1 flex-col items-center justify-center px-4 text-zWhite bg-zBlack">
      <img src="@/assets/logo-furia.png" alt="Logo Furia" class="w-1/4 h-auto mb-3 mt-1" />

      <div class="w-full max-w-sm bg-zDarkGray p-6 rounded-lg shadow-md flex flex-col items-center">
        <img src="@/assets/logo-z3r4.png" alt="Z3R4" class="w-1/3 h-auto mb-2" />

        <p class="text-center text-lg text-zLightGray mb-6 mt-4">
          Bem-vindo à <span class="text-zYellow font-bold">Z3R4</span> Seu registro foi concluído com sucesso. Clique <router-link to="/" class="text-zYellow underline">Aqui</router-link> para fazer login.
        </p>


      </div>
    </div>
  </div>
</template>
