import { ref, watch } from 'vue';

const apiUrl =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_URL_TEST
    : import.meta.env.VITE_URL_PRODUCTION;

export function useRegister() {
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const loading = ref(false);
  const error = ref(null);
  const redirect = ref(false);
  const msgPassword = ref('');

  watch([password, confirmPassword], () => {
    if (
      password.value &&
      confirmPassword.value &&
      password.value !== confirmPassword.value
    ) {
      msgPassword.value = 'As senhas não coincidem';
    } else {
      msgPassword.value = '';
    }
  });

  async function register() {
    loading.value = true;
    error.value = null;

    if (password.value !== confirmPassword.value) {
      error.value = 'As senhas não coincidem';
      loading.value = false;
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
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
        throw new Error(data.error || 'Erro ao criar conta');
      }
      redirect.value = true;
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
    } catch (err) {
      error.value = err.message || 'Erro inesperado';
    } finally {
      loading.value = false;
    }
  }

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    loading,
    error,
    redirect,
    msgPassword,
    register,
  };
}
