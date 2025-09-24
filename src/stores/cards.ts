import {defineStore} from 'pinia';
import memePreShowFront from "@/assets/memePreShowFront.png";
import memePreShowBack from "@/assets/memePreShowBack.svg"
import situationPreFrontBack from "@/assets/situationsSvg.svg"

import M1 from "@/assets/localCardsBD/MemeDB/M1.jpg"
import M2 from "@/assets/localCardsBD/MemeDB/M2.webp"
import M3 from "@/assets/localCardsBD/MemeDB/M3.jpg"
import M4 from "@/assets/localCardsBD/MemeDB/M4.jpg"


type CommonAreaCard = {
  id: string
  x: number
  y: number
}

export const useAllCardsStore = defineStore('allCardsStore', {
  state: () => ({
    // Список всех карт
    previewCard: {
      id: 'default',
      flipped: false,
      srcFrontImg: memePreShowFront,
      srcBackImg: memePreShowBack
    },
    defaultSituationCard: {
      id: 'defaultSituation',
      flipped: false,
      srcFrontImg: situationPreFrontBack,
      srcBackImg: situationPreFrontBack
    },
    cardsMeme: [
      {
        id: crypto.randomUUID(),
        title: 'Имя карты (название карты мема)',
        srcFrontImg: M1,
        srcBackImg: memePreShowBack,
        flipped: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Имя карты (название карты мема)',
        srcFrontImg: M2,
        srcBackImg: memePreShowBack,
        flipped: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Имя карты (название карты мема)',
        srcFrontImg: M3,
        srcBackImg: memePreShowBack,
        flipped: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Имя карты (название карты мема)',
        srcFrontImg: M4,
        srcBackImg: memePreShowBack,
        flipped: false
      },
    ],
    cardsSituation: [
      {
        id: crypto.randomUUID(),
        title: 'Ситуация',
        descriptionOne: 'Когда Wi-Fi есть, но интернета нет.',
        descriptionTwo: 'Учитель: "Это будет на экзамене". Я:',
        flipped: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Ситуация',
        descriptionOne: 'Открыл холодильник в 3 ночи.',
        descriptionTwo: 'Когда скачал фильм на 50 ГБ, а это 3 минуты рекламы.',
        flipped: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Ситуация',
        descriptionOne: 'Друг: "Пойдём по одному пиву".',
        descriptionTwo: 'Зашёл в спортзал первый раз.',
        flipped: false
      },
      {
        id: crypto.randomUUID(),
        title: 'Ситуация',
        descriptionOne: 'Когда мама говорит: "А кто это у нас такой умный?".',
        descriptionTwo: 'Купил подписку, чтобы не было рекламы…',
        flipped: false
      }
    ],
    cardsOnCommonArea: [] as CommonAreaCard[],
    discardPileCardHolderMeme: [],
    discardPileCardHolderSituation: []
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
    },
    getCardMemeById(id: string) {
      return this.cardsMeme.find(card => card.id === id) || null;
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
