<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { WatchService } from '@/services/watch.service';
import type { WatchModel } from '@/types/watch.model';

const watches = ref<WatchModel[]>([]);

async function loadWatches() {
  try {
    watches.value = await WatchService.getAllWatches();
    console.log("✅ Učitani satovi:", watches.value); // 👈 Dodato ovde
  } catch (error) {
    console.error('❌ Failed to load watches:', error);
  }
}

onMounted(() => {
  loadWatches();
});

async function addToCart(model: WatchModel) {
  try {
    let watches: WatchModel[] = JSON.parse(sessionStorage.getItem("watches") || "[]");
    watches = [...watches, model];
    sessionStorage.setItem("watches", JSON.stringify(watches));
  } catch (error) {
    console.error('❌ Failed to add to cart:', error);
  }
}


</script>

<template>
  <div v-if="watches.length > 0">
    <h1 class="h3">Watches</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Brand</th>
          <th scope="col">Price</th>
          <th scope="col">Add To Cart</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in watches" :key="p.watchId">
          <th scope="row">{{ p.watchId }}</th>
          <td>{{ p.name }}</td>
          <td>{{ p.brand }}</td>
          <td>{{ p.price }}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-success" @click="() => addToCart(p)">
                <i class="fa-solid fa-cart-plus"></i>
                Buy Now
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>Watches are being loaded. Please wait!</div>
</template>
