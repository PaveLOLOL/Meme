import { defineStore } from 'pinia';

type CommonAreaCard = {
  id: string
  x: number
  y: number
}

export const useCommonAreaStore = defineStore('commonArea', {
  state: () => ({
    cardsOnCommonArea: [] as CommonAreaCard[],
  }),
  getters: {
  },
  actions: {

  },
});
