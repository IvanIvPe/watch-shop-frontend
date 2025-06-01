<template>
  <div class="login">
    <h1 class="h3 text-center">Welcome!</h1>
    <form v-on:submit.prevent="doLogin">
      <div class="mb-3">
        <label for="username" class="form-label text-start">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" required />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label text-start">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>

      <!-- Error message -->
      <p v-if="error" class="text-center text-danger mt-3">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { login } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const username = ref<string>('');
const password = ref<string>('');
const error = ref<string>('');
const router = useRouter(); 

async function doLogin() {
    try {
        if (username.value === '') return;
        if (password.value === '') return;
        const rsp = await login(username.value, password.value);
        console.log('Login Response:', rsp.data);
        AuthService.saveAuth(rsp.data);
        router.push('/watch');
    } catch (e: any) {
        console.error('Login error:', e);
        error.value = e.response?.data?.error || 'Login failed. Please check your credentials.';
    }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  width: 350px;
  padding: 30px;
  border-radius: 10px;
  background-color: #212529;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

input {
  width: 250px;
  margin: 0 auto;
  display: block;
}

h1 {
  margin-bottom: 20px;
  color: white;
}

label {
  color: #adb5bd;
  display: block;
  text-align: left;
  margin-bottom: 5px;
}

button {
  margin-top: 20px;
}
</style>
