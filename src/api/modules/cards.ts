/*
* Импорты для будущего бека
* */

// import instance from '@/api/http';
//import {cardsMemeParams} from '@/types/card'

import { useAllCardsStore } from "@/stores/cards";
import M1 from "@/assets/localCardsBD/MemeDB/M1.jpg";
import memePreShowBack from "@/assets/memePreShowBack.svg";
import M2 from "@/assets/localCardsBD/MemeDB/M2.webp";
import M3 from "@/assets/localCardsBD/MemeDB/M3.jpg";
import M4 from "@/assets/localCardsBD/MemeDB/M4.jpg";

export default {
  getCardsList() {
    // todo для будущего бека а пока с фронта мок
    //return instance.get<cardsMemeParams>('cards', {params});
    const allCardsStore = useAllCardsStore();
    allCardsStore.cardsMeme = [
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
    ]
  },
}
