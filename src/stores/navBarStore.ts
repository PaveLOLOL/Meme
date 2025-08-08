import { defineStore } from 'pinia';

export const useNavBarBarStore = defineStore('navBarStore', {
  state: () => ({
    open: false,
  }),
  getters: {
    isOpen: (state) => state.open,
  },
  actions: {
    close() {
      this.open = false;
    },
    openPanel() {
      this.open = true;
    },
    changeFlag() {
      this.open = !this.open;
    },
  },
});
