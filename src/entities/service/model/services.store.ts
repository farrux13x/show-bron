import { defineStore } from 'pinia';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';

export type ServiceItem = {
  id: string;
  name: string;
  price: number;
};

const STORAGE_KEY = 'timetrack.services.v1';

const createId = () => Math.random().toString(36).slice(2, 10);

const defaultServices: ServiceItem[] = [
  { id: 'svc_haircut', name: 'Haircut', price: 50 },
  { id: 'svc_beard', name: 'Beard', price: 30 },
  { id: 'svc_haircut_beard', name: 'Haircut + Beard', price: 70 },
  { id: 'svc_kids', name: 'Kids', price: 25 },
];

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: loadFromStorage<ServiceItem[]>(STORAGE_KEY, defaultServices),
  }),
  getters: {
    byName: (state) => (name: string) =>
      state.services.find(
        (item) => item.name.toLowerCase() === name.toLowerCase(),
      ),
  },
  actions: {
    addService(payload: { name: string; price: number }) {
      const service: ServiceItem = {
        id: createId(),
        name: payload.name,
        price: payload.price,
      };
      this.services.push(service);
      this.persist();
      return service;
    },
    updateService(id: string, patch: Partial<ServiceItem>) {
      const index = this.services.findIndex((item) => item.id === id);
      if (index === -1) {
        return;
      }
      this.services[index] = { ...this.services[index], ...patch };
      this.persist();
    },
    removeService(id: string) {
      this.services = this.services.filter((item) => item.id !== id);
      this.persist();
    },
    persist() {
      saveToStorage(STORAGE_KEY, this.services);
    },
  },
});
