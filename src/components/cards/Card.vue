<template>
  <div class="deck">
    <div
      class="meme-card"
      :class="isFlipped ? '' : 'meme-card--flipped'"
      @click="allCardsStore.flipCard(props.cardId)"
    >
      <div class="meme-card__face meme-card__face--front">
        <img :src="srcFrontImg" :alt="altFront" class="meme-card__img front-img__img"/>
      </div>
      <div class="meme-card__face meme-card__face--back">
        <img :src="srcBackImg" :alt="altBack" class="meme-card__img back-img__img"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAllCardsStore } from "@/stores/cards"

import {defineProps, computed} from "vue"
const props = defineProps({
  cardId: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  srcFrontImg: {
    type: String,
    required: false,
  },
  srcBackImg: {
    type: String,
    required: false,
  },
  altFront: {
    type: String,
    required: false,
    default: 'Meme 😎'
  },
  altBack: {
    type: String,
    default: 'Meme 🎴'
  },
  isFlipped: {
    type: Boolean,
    required: false,
  }
});

const allCardsStore = useAllCardsStore()

const isDefaultCard = computed(() => {

})

</script>

<style lang="scss" scoped>
.deck {
  display: flex;
  justify-content: center;
}

.meme-card {
  /* Сделали горизонтальную карту */
  width: 200px;
  height: 130px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  transition: box-shadow 0.2s;

  &__face {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: bold;
    backface-visibility: hidden;
    user-select: none;
    transition: transform 0.5s cubic-bezier(.4, 2, .5, 1);
    will-change: transform;
  }

  &__face--front {
    background: #fff;
    color: #222;
    z-index: 2;
    transform: rotateY(0deg);

    &__img {
      background-color: red;
    }
  }

  &__face--back {
    background: #7c3aed;
    color: #fff;
    z-index: 1;
    transform: rotateY(180deg);

    &__img {
      background-color: red;
    }
  }

  &--flipped {
    .meme-card__face--front {
      transform: rotateY(180deg);
    }

    .meme-card__face--back {
      transform: rotateY(0deg);
    }
  }
}

/* Ограничиваем размеры для всех img */
.meme-card__img {
  max-width: 100%;
  max-height: 100%;
  padding: 1px;
  object-fit: contain;
}
</style>
