<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { CartService } from '@/services/cart.service';
import type { CartModel } from '@/types/cart.model';
import type { WatchModel } from '@/types/watch.model';
import { computed, ref } from 'vue';

const watches = ref<WatchModel[]>(JSON.parse(sessionStorage.getItem("watches") || "[]"));

async function remove(model: WatchModel) {
  const index = watches.value.indexOf(model);
  watches.value.splice(index, 1);
  sessionStorage.setItem("watches", JSON.stringify(watches.value));
}

const totalPrice = computed(() => {
  return watches.value.reduce((total: number, watch: WatchModel) => {
    return total + parseFloat(watch.price);
  }, 0);
});

function clearCart() {
  watches.value = [];
  sessionStorage.removeItem("watches");
}

async function placeOrder() {
  const user = await AuthService.getUserById();
  const cartData: CartModel = {
    orderId: Date.now(),
    watchId: watches.value.map(p => p.watchId),
    totalPrice: totalPrice.value,
    userId: user.userId,
  };

  const response = await CartService.createCart(cartData);
  if (response) {
    alert('Your order is on your way!');
    clearCart();
  } else {
    alert('Failed to order. Please try again.');
  }
}
</script>

<template>
  <div v-if="watches.length > 0">
    <h1 class="h3">Your Cart</h1>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price (€)</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in watches" :key="p.watchId">
          <td>{{ p.watchId }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.brand }}</td>
          <td>{{ p.price }}</td>
          <td>
            <button class="btn btn-sm btn-warning" @click="remove(p)">
              <i class="fa-solid fa-circle-minus"></i>
              Remove
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="5"><strong>Total Price: {{ totalPrice }} $</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>Your cart is empty!</div>

  <button class="btn btn-success" @click="placeOrder">
    <i class="fa-solid fa-cart-shopping"></i>
    Purchase
  </button>
  <button class="btn btn-danger" @click="clearCart">
    <i class="fa-solid fa-trash-can"></i>
    Cancel Cart
  </button>
</template>
