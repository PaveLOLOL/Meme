import { defineStore } from 'pinia';

// id и tableID записаны строкой для будущих UUID

// todo ограничить 16 игроками, так как карточек на партию будет раздаваться 96

type Player = {
  id: string
  name: string
  surname: string
  cells: (string | null)[]
}

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [
      {
        id: 'defaultPlayerID',
        name: 'Def',
        surname: 'Fed',
        cells: [null, null, null, null, null, null]
      }
    ] as Player[]
  }),
  getters: {
  },
  actions: {

  },
});
