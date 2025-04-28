import { ref } from 'vue';
import { useRouter } from 'vue-router';

const apiUrl =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_URL_TEST
    : import.meta.env.VITE_URL_PRODUCTION;

export function useLogin() {
  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();
  async function login() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Resposta não é um JSON válido');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }
      localStorage.setItem('user_id', JSON.stringify(data.user.id));
      router.push('/chat');
    } catch (err) {
      error.value = err.message || 'Erro inesperado';
    } finally {
      loading.value = false;
    }
  }

  return {
    email,
    password,
    loading,
    error,
    login,
  };
}
