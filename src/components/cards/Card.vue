<template>
  <div class="deck">
    <div
      class="meme-card"
      :class="cardStore.flipped ? '' : 'meme-card--flipped'"
      @click="cardStore.changeFlag"
      title="Кликни для переворота"
    >
      <div class="meme-card__face meme-card__face--front">
        <slot name="front">😎</slot>
      </div>
      <div class="meme-card__face meme-card__face--back">
        <slot name="back">🎴</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCardStore} from "@/stores/card"

const cardStore = useCardStore();


</script>

<style lang="scss" scoped>
.deck {
  display: flex;
  justify-content: center;
}

.meme-card {
  /* Сделали горизонтальную карту */
  width: 192px;
  height: 128px;
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
  }

  &__face--back {
    background: #7c3aed;
    color: #fff;
    z-index: 1;
    transform: rotateY(180deg);
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
</style>
