<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthService } from './services/auth.service';

const router = useRouter()

function logout() {
  AuthService.clearAuth()
  sessionStorage.clear()
  router.push({
    path: '/login'
  })
}
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <i class="fa-solid fa-clock"></i>
          Online Watch Shop
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- Prikazi samo ako je korisnik ulogovan -->
            <template v-if="AuthService.hasAuth()">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/user">MY PROFILE</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/watch">WATCHES</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/cart">CART</RouterLink>
              </li>
              <li class="nav-item">
                <button type="button" class="nav-link" @click="logout">Logout</button>
              </li>
            </template>

            <!-- Prikazi ako korisnik NIJE ulogovan -->
            <template v-else>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/register">Register</RouterLink>
              </li>
            </template>
          </ul>

          <!-- Ime korisnika samo ako je ulogovan -->
          <span class="navbar-text" v-if="AuthService.hasAuth()">
            <i class="fa-regular fa-user"></i> {{ AuthService.getUsernameLog() }}
          </span>
        </div>
      </div>
    </nav>

    <RouterView :key="$route.fullPath" />
  </div>
</template>
