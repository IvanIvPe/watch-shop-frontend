<template>
  <div class="register-container">
    <h2>Registracija</h2>
    <form @submit.prevent="submit">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="phone" type="text" placeholder="Phone" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Registruj se</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const message = ref('')

const submit = async () => {
  try {
    const response = await axios.post('/api/user', {
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    })
    message.value = 'Registracija uspešna!'
    console.log('✔ Registrovan:', response.data)
  } catch (err: any) {
    message.value = err.response?.data?.error || 'Greška pri registraciji'
    console.error('❌ Registracija error:', err)
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
input {
  padding: 0.5rem;
  font-size: 1rem;
}
button {
  padding: 0.5rem;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
