<script setup>
import { useLogin } from '../composables/useLogin'


const { email, password, loading, error, login } = useLogin()
</script>

<template>
  <div class="min-h-screen bg-zBlack flex flex-col lg:flex-row">

<div class="flex flex-1 flex-col items-center justify-center px-4 text-zWhite bg-zBlack">


      <img src="@/assets/logo-furia.png" alt="Logo Furia" class="w-1/4 h-auto mb-3 mt-1" />

      <div class="w-[100%] max-w-sm bg-zDarkGray p-6 rounded-lg shadow-md flex flex-col items-center">

        <img src="@/assets/logo-z3r4.png" alt="Z3R4" class="w-1/3 h-auto mb-2" />

        <p class="text-center text-sm text-zLightGray mb-6">
          QUEM VIVE O JOGO, ENTENDE O JOGO
        </p>

        <form @submit.prevent="login" class="flex flex-col gap-4 w-full">
          <div>
            <label class="block text-zLightGray text-sm mb-1">Email:</label>
            <input 
              v-model="email" 
              type="email" 
              placeholder="Digite seu email"
              class="w-full p-2 rounded-full text-sm bg-transparent border border-zYellow text-zWhite placeholder-zLightGray focus:outline-none"
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

          <button 
            type="submit" 
            :disabled="loading"
            class="bg-zYellow text-zBlack font-bold py-2 rounded-full hover:opacity-90 transition disabled:opacity-50 w-[50%] place-self-center"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>

          <p v-if="error" class="text-red-500 text-center text-sm">{{ error }}</p>
        </form>

        <p class="text-xs text-zLightGray text-center mt-4">
          Ainda não tem uma conta? Crie <router-link to="/register" class="text-zYellow underline">aqui</router-link> 
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

  </div>
</template>


