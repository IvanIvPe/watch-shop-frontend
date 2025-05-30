import axios from "axios";
import { useAxios } from "./main.service";
import type { WatchModel } from "@/types/watch.model";

export class WatchService {
    static async getAllWatches(): Promise<WatchModel[]> {
        const response = await useAxios<WatchModel[]>('/watch');
        return response.data; 
    }

    static async getWatchById(id: number): Promise<WatchModel> {
        const response = await useAxios<WatchModel>(`/watch/${id}`);
        return response.data; 
    }
}