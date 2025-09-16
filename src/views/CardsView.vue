<template>
  <div>
    <BaseLayout>
      <template #content>
        <div class="table" id="meme-table">
<!--          todo добавить id для тестирования для всех элементов-->
          <div class="table__zone-cards-meme">zone_cards_meme
            <div
              v-for="meme in allCardsStore.$state.cardsMeme"
              class="table__zone-cards-meme-card-holder-meme"
            >
              <Card
                :srcFrontImg="meme.srcFrontImg"
                :srcBackImg="meme.srcBackImg"
                :cardId="meme.id"
                :isFlipped="meme.flipped"
                draggable="true"
                @dragstart="onCardDragStart(meme, $event)"
              />
            </div>
            <div
              class="table__zone-cards-meme-card-holder-situation"
              v-for="situation in allCardsStore.$state.cardsSituation"
            >
              <Card
                :descriptionOne="situation.descriptionOne"
                :descriptionTwo="situation.descriptionTwo"
                :cardId="situation.id"
                :isFlipped="situation.flipped"
              />
            </div>
          </div>
          <div class="table__zone-game-place">
            <div class="table__zone-game-place common-area">Верх (общая зона)</div>
            <div class="table__zone-game-place playing-card-area grid-playing-card-area"
            >
              <div
                v-for="(cell, i) in cells"
                :key="i"
                @dragover.prevent
                @drop="onDrop(i, $event)"
                class="grid-playing-card-area__item"
              >
                <Card
                  v-if="cellCards[i]"
                  :srcFrontImg="cellCards[i]?.srcFrontImg"
                  :srcBackImg="cellCards[i]?.srcBackImg"
                  :cardId="cellCards[i]?.id"
                  :isFlipped="cellCards[i]?.flipped"
                />
              </div>
            </div>
          </div>
          <div class="table__zone-discard-pile">zone_discard_pile
            <div class="table__zone-cards-meme-card-holder-discard-pile-meme">
              zone-cards-meme-card-holder
            </div>
            <div class="table__zone-cards-meme-card-holder-discard-pile-situation">
              zone-cards-meme-card-holder
            </div>
          </div>
        </div>
      </template>
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import Card from '@/components/cards/Card.vue'

import { useAllCardsStore } from "@/stores/cards"
import { ref, computed } from "vue"

import {cardsMeme} from "@/types/card";

const allCardsStore = useAllCardsStore()


// 6 ячеек (3x2), null = пустая
const cells = ref<(string | null)[]>([null, null, null, null, null, null])

function onCardDragStart(card: cardsMeme, event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("text/plain", card.id)
  }
}

function onDrop(index: number, event: DragEvent) {
  if (!event.dataTransfer) return
  const id = event.dataTransfer?.getData("text/plain")
  if (!id) return

  // если ячейка пустая — кладём id
  if (cells.value[index] === null) {
    cells.value[index] = id
  }
}

const cellCards = computed(() => {
  return cells.value.map(cellId =>
    cellId ? allCardsStore.getCardMemeById(cellId) : null
  )
})

</script>

<style lang="scss" scoped>
$card-w: 210px;
$card-h: 140px;

.table {
  background-color: red;
  width: calc(100vw - 160px);
  height: calc(100vh - 100px);
  margin: 10px;
  display: flex;
  gap: 16px;
  border-radius: 16px;


  &__zone-cards-meme {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0 0 calc((100% - 2*16px) / 4);
    gap: 16px;
    border-radius:  16px 0 0 16px;
    background-color: green;
  }
  &__zone-cards-meme-card-holder-meme {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $card-w;
    height: $card-h;
    background-color: pink;
  }
  &__zone-cards-meme-card-holder-situation {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $card-w;
    height: $card-h;
    background-color: purple;
  }


  &__zone-game-place {
    background-color: blue;
    flex: 0 0 calc((100% - 2*16px) / 2);
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;

    .common-area {
      background-color: lavender;
    }

    .playing-card-area {
      background-color: deeppink;
      border: black 2px solid;
    }
  }


  &__zone-discard-pile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex: 0 0 calc((100% - 2*16px) / 4);
    border-radius:  0 16px 16px 0;
    background-color: yellow;
  }
  &__zone-cards-meme-card-holder-discard-pile-meme {
    width: $card-w;
    height: $card-h;
    background-color: violet;
  }
  &__zone-cards-meme-card-holder-discard-pile-situation {
    width: $card-w;
    height: $card-h;
    background-color: coral;
  }
}

.grid-playing-card-area {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* ровно 3 колонки */
  grid-template-rows: repeat(2, 150px);    /* ровно 2 строки по 150px */
  gap: 2px;                               /* промежутки между ячейками */
  margin: 0 auto;

  &__item {
    background-color: palegreen !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 210px;
    height: 140px;
  }
}
</style>
