import { ref } from "vue";
import type { WatchModel } from "./watch.model";

export interface CartModel {
    orderId: number
    watchId: number[];  
    totalPrice: number;  
    userId: number;  
  }  
  const watchs = ref<WatchModel[]>(JSON.parse(sessionStorage.getItem("watchs") || "[]"));

