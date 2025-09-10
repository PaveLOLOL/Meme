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
              />
            </div>
            <div
              class="table__zone-cards-meme-card-holder-situation"
              v-for="situation in allCardsStore.$state.cardsSituation"
            >
              <Card
                :srcFrontImg="situation.descriptionOne"
                :srcBackImg="situation.descriptionTwo"
                :cardId="situation.id"
                :isFlipped="situation.flipped"
              />
            </div>
          </div>
          <div class="table__zone-game-place">zone_game_place</div>
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

const allCardsStore = useAllCardsStore()
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
    width: $card-w;
    height: $card-h;
    background-color: pink;
  }
  &__zone-cards-meme-card-holder-situation {
    width: $card-w;
    height: $card-h;
    background-color: purple;
  }


  &__zone-game-place {
    background-color: blue;
    flex: 0 0 calc((100% - 2*16px) / 2);
    margin-top: 5px;
    margin-bottom: 5px;
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
</style>
