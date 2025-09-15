import { defineStore } from 'pinia';
import memePreShowFront from "@/assets/memePreShowFront.png";
import memePreShowBack from "@/assets/memePreShowBack.svg"


export const useAllCardsStore = defineStore('allCardsStore', {
  state: () => ({
    // Список всех карт
    previewCard: {
      id: 'default',
      flipped: false,
      srcFrontImg: memePreShowFront,
      srcBackImg: memePreShowBack
    },
    cardsMeme: [{
      id: '1',
      title: 'Имя карты (название карты мема)',
      srcFrontImg: 'путь до картинки (рубашка)',
      srcBackImg: 'путь до картинки (мем)',
      flipped: false
    }],
    cardsSituation: [{
      id: '2',
      title: 'Имя карты (название карты ситуации)',
      descriptionOne: 'Описание карты (только для ситуации 1)',
      descriptionTwo: 'Описание карты (только для ситуации 2)',
      flipped: false
    }],
  }),
  actions: {
    flipCard(id) {
      if (id === this.previewCard.id) {
        this.previewCard.flipped = !this.previewCard.flipped
        return
      }
      let card = this.cardsMeme.find(card => card.id === id)
      if (card) {
        card.flipped = !card.flipped
        return
      }
      card = this.cardsSituation.find(card => card.id === id)
      if (card) {
        card.flipped = !card.flipped
        return
      }
    },
    setFlipped(id, value) {
      if (id === this.previewCard.id) {
        this.previewCard.flipped = !!value
        return
      }
      let card = this.cardsMeme.find(c => c.id === id)
      if (card) {
        card.flipped = !!value
        return
      }
      card = this.cardsSituation.find(card => card.id === id)
      if (card) {
        card.flipped = !!value
        return
      }
    },
    resetAllFlipped() {
      this.previewCard.flipped = false
      this.cardsMeme.forEach(c => c.flipped = false)
      this.cardsSituation.forEach(c => c.flipped = false)
    }
  }
});

/*
*     cardsMeme: [{
      id: 'уникальный идентификатор карты',
      title: 'Имя карты (название карты мема)',
      srcFrontImg: 'путь до картинки (рубашка)',
      srcBackImg: 'путь до картинки (мем)',
      flipped: false
    }],
    cardsSituation: [{
      id: 'уникальный идентификатор карты',
      title: 'Имя карты (название карты ситуации)',
      descriptionOne: 'Описание карты (только для ситуации 1)',
      descriptionTwo: 'Описание карты (только для ситуации 2)',
      flipped: false
    }],
* */
