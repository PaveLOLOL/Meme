import { defineStore } from 'pinia';

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    flipped: false,
  }),
  getters: {
    isOpenFront: (state) => state.flipped,
  },
  actions: {
    close() {
      this.flipped = false;
    },
    openPanel() {
      this.flipped = true;
    },
    changeFlag() {
      this.flipped = !this.flipped;
    },
  },
});
