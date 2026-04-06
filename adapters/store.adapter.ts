import { createToy } from "../store/application/toy/createToy";
import { listToys } from "../store/application/toy/listToys";

type StoreStatus = {
  initialized: boolean;
};

const storeState: StoreStatus = {
  initialized: false,
};

export function initStore() {
  console.log("Initializing store...");

  // Aqui depois entra conexão com DB (Supabase etc)
  storeState.initialized = true;

  console.log("Store initialized");
}

export function getStoreStatus() {
  return storeState;
}

// 🔽 ADAPTERS DO DOMÍNIO (PONTE REAL)

export function createToyAdapter(name: string) {
  if (!storeState.initialized) {
    throw new Error("Store not initialized");
  }

  return createToy(name);
}

export function listToysAdapter() {
  if (!storeState.initialized) {
    throw new Error("Store not initialized");
  }

  return listToys();
}