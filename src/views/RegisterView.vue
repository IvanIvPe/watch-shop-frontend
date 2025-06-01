<template>
  <div class="register">
    <h1 class="h3 text-center">Register</h1>
    <form v-on:submit.prevent="doRegister">
      <div class="mb-3">
        <label for="username" class="form-label text-start">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" required />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label text-start">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label text-start">Phone</label>
        <input type="text" class="form-control" id="phone" v-model="phone" required />
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
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const error = ref<string>('')
const router = useRouter()

const doRegister = async () => {
  try {
    await axios.post('http://localhost:4000/api/user/register', {
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    })
    router.push('/login')
  } catch (err: any) {
    console.error('Registration failed', err.response?.data?.error || err)
    error.value = err.response?.data?.error || 'Registration failed. Please check the fields.';
  }
}
</script>

<style scoped>
.register {
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
