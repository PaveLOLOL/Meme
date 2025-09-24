<template>
  <div>
    <BaseLayout>
      <template #content>
        <div class="table" id="meme-table">
          <!--          todo добавить id для тестирования для всех элементов-->
          <div class="table__zone-cards-meme">
          <div class="table__zone-cards-meme-card-holder-meme stack">
            <div
              v-for="(meme,index) in allCardsStore.$state.cardsMeme"
              :key="meme.id"
              class="stack__card"
              :style="{ zIndex: index }"
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
        </div>

            <div class="table__zone-cards-meme-card-holder-situation stack">
              <div
                v-for="(situation, index) in allCardsStore.$state.cardsSituation"
                :key="situation.id"
                class="stack__card"
                :style="{ zIndex: index }"
              >
                <Card
                  :descriptionOne="situation.descriptionOne"
                  :descriptionTwo="situation.descriptionTwo"
                  :cardId="situation.id"
                  :isFlipped="situation.flipped"
                  :ref="setSituationRef(situation.id)"
                />
              </div>
            </div>
          </div>
          <div class="table__zone-game-place">
            <div
              class="table__zone-game-place common-area"
              @dragover.prevent
              @drop="onDropCommonArea($event)"
            >
              <div
                v-for="card in allCardsStore.cardsOnCommonArea"
                :key="card.id"
                class="draggable-card"
                :style="{ top: card.y + 'px', left: card.x + 'px' }"
                :ref="setCardRef(card.id)"
              >
                <Card
                  :srcFrontImg="getCardData(card.id)?.srcFrontImg"
                  :srcBackImg="getCardData(card.id)?.srcBackImg"
                  :cardId="card.id"
                  :isFlipped="true"
                />
              </div>
            </div>
            <div class="table__zone-game-place playing-card-area grid-playing-card-area"
            >
              <div
                v-for="(cell, i) in cells"
                :key="i"
                @dragover.prevent
                @drop="onDrop(i, $event)"
                class="grid-playing-card-area__item"
              >
                <div v-if="cellCards[i]" class="motion-wrap">
                  <Card
                    :srcFrontImg="cellCards[i]?.srcFrontImg"
                    :srcBackImg="cellCards[i]?.srcBackImg"
                    :cardId="cellCards[i]?.id"
                    :isFlipped="cellCards[i]?.flipped"
                    draggable="true"
                    @dragstart="onCardDragStart(cellCards[i], $event)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="table__zone-discard-pile">
            <div
              class="table__zone-cards-meme-card-holder-discard-pile-meme"
              ref="discardMemeRef"
            >
              <Card
                :srcFrontImg="allCardsStore.$state.previewCard.srcFrontImg"
                :srcBackImg="allCardsStore.$state.previewCard.srcBackImg"
                :cardId="allCardsStore.$state.previewCard.id"
                :isFlipped="false"
              />
            </div>
            <div
              class="table__zone-cards-meme-card-holder-discard-pile-situation"
              ref="discardSituationRef"
            >
              <Card
                :srcFrontImg="allCardsStore.$state.defaultSituationCard.srcFrontImg"
                :srcBackImg="allCardsStore.$state.defaultSituationCard.srcBackImg"
                :cardId="allCardsStore.$state.defaultSituationCard.id"
                :isFlipped="false"
              />
            </div>
          </div>
        </div>
      </template>
      <template #control-panel>
        <ControlPanel
          :buttons="[
            { label: 'Режим судьи', type: 'judge-mode' },
            { label: 'Режим игрока', type: 'player-mode' },
            { label: 'Раздать автоматически', type: 'card-distribution' },
            { label: 'Сброс', type: 'card-reset' }
            ]"
          @action="handleAction"
        />
      </template>
    </BaseLayout>
  </div>
</template>

<script setup lang="ts">
import BaseLayout from '@/layouts/BaseLayout.vue'
import Card from '@/components/cards/Card.vue'
import ControlPanel from '@/components/controlPanel/ControlPanel.vue'

import {useAllCardsStore} from "@/stores/cards"
import {ref, computed} from "vue"

import {cardsMeme} from "@/types/card";

const allCardsStore = useAllCardsStore()


// 6 ячеек (3x2), null = пустая
const cells = ref<(string | null)[]>([null, null, null, null, null, null])

// для карт из общей зоны (мемы)
const cardRefs = ref(new Map<string, HTMLElement>())

function setCardRef(id: string) {
  return (el: any) => {
    if (el) cardRefs.value.set(id, el.$el ?? el as HTMLElement)
    else cardRefs.value.delete(id)
  }
}

function getCardRef(id: string) {
  return cardRefs.value.get(id)
}

// для situation-карт
const situationRefs = ref(new Map<string, HTMLElement>())

function setSituationRef(id: string) {
  return (el: any) => {
    if (el) situationRefs.value.set(id, el.$el ?? el as HTMLElement)
    else situationRefs.value.delete(id)
  }
}

function getSituationRef(id: string) {
  return situationRefs.value.get(id)
}

// для зон сброса
const discardMemeRef = ref<HTMLElement | null>(null)
const discardSituationRef = ref<HTMLElement | null>(null)

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

function onDropCommonArea(event: DragEvent) {
  if (!event.dataTransfer) return
  const id = event.dataTransfer.getData("text/plain")
  if (!id) return

  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()

  // размеры карты
  const cardW = 210
  const cardH = 140

  // координаты курсора внутри контейнера
  let x = event.clientX - rect.left - cardW / 2
  let y = event.clientY - rect.top - cardH / 2


  // размеры контейнера
  const maxX = rect.width - cardW
  const maxY = rect.height - cardH

  // зажимаем значения
  if (x < 0) x = 0
  if (y < 0) y = 0
  if (x > maxX) x = maxX
  if (y > maxY) y = maxY

  if (allCardsStore.getCardMemeById(id)) {
    allCardsStore.cardsOnCommonArea.push({id, x, y})
    cells.value.forEach((elId, index) => {
      if (elId === id) {
        cells.value[index] = null
      }
    })
  }
}

const cellCards = computed(() => {
  return cells.value.map(cellId =>
    cellId ? allCardsStore.getCardMemeById(cellId) : null
  )
})

function getCardData(id: string) {
  return allCardsStore.getCardMemeById(id)
}

function handleAction(button: { label: string; type: string }) {
  console.log('Нажата кнопка:', button.label, 'тип:', button.type)
  switch (button.label) {
    case 'Режим судьи':

      break

    case 'Режим игрока':

      break

    case 'Раздать автоматически':

      break

    case 'Сброс':
      resetAllCards()
      break
  }
}

function resetAllCards() {
  if (!discardMemeRef.value || !discardSituationRef.value) return

  const dzRectMeme = discardMemeRef.value.getBoundingClientRect()
  const dzRectSituation = discardSituationRef.value.getBoundingClientRect()

  // мемы
  allCardsStore.cardsOnCommonArea.forEach(card => {
    const el = getCardRef(card.id)
    if (!el) return
    const rect = el.getBoundingClientRect()
    animateFly(el, rect, dzRectMeme)
  })

  // ситуации
  const situation = allCardsStore.cardsSituation[allCardsStore.cardsSituation.length - 1]
  if (situation) {
    const el = getSituationRef(situation.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      animateFly(el, rect, dzRectSituation)
    }
  }

  setTimeout(() => {
    allCardsStore.discardPileCardHolderMeme.push(...allCardsStore.cardsOnCommonArea)
    allCardsStore.cardsOnCommonArea = []
    allCardsStore.discardPileCardHolderSituation.push(allCardsStore.cardsSituation[allCardsStore.cardsSituation.length - 1])
    cells.value = [null, null, null, null, null, null]
  }, 500)
}


function animateFly(el: HTMLElement, from: DOMRect, to: DOMRect) {
  const deltaX = to.left + to.width / 2 - (from.left + from.width / 2)
  const deltaY = to.top + to.height / 2 - (from.top + from.height / 2)

  el.animate(
    [
      {transform: 'translate(0, 0)', opacity: 1},
      {transform: `translate(${deltaX}px, ${deltaY}px) scale(0.5)`, opacity: 0.5}
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards'
    }
  )
}


</script>

<style lang="scss" scoped>
$card-w: 210px;
$card-h: 140px;

.table {
  background-color: red;
  width: calc(100vw - 160px);
  height: calc(100vh - 160px);
  margin: 10px;
  display: flex;
  gap: 16px;
  border-radius: 16px;


  &__zone-cards-meme {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0 0 calc((100% - 2 * 16px) / 4);
    gap: 16px;
    border-radius: 16px 0 0 16px;
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
    flex: 0 0 calc((100% - 2 * 16px) / 2);
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;

    .common-area {
      position: relative;
      background-color: lavender;
      width: 100%;
      height: 300px;
    }

    .draggable-card {
      position: absolute;
      width: 210px;
      height: 140px;
      cursor: grab;
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
    flex: 0 0 calc((100% - 2 * 16px) / 4);
    border-radius: 0 16px 16px 0;
    background-color: yellow;
  }

  &__zone-cards-meme-card-holder-discard-pile-meme {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $card-w;
    height: $card-h;
    background-color: violet;
  }

  &__zone-cards-meme-card-holder-discard-pile-situation {
    display: flex;
    justify-content: center;
    align-items: center;
    width: $card-w;
    height: $card-h;
    background-color: coral;
  }
}

.grid-playing-card-area {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* ровно 3 колонки */
  grid-template-rows: repeat(2, 150px); /* ровно 2 строки по 150px */
  gap: 2px; /* промежутки между ячейками */
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

.stack {
  position: relative;
  width: $card-w;
  height: $card-h;

  &__card {
    position: absolute;
    transition: transform 0.2s ease;
    cursor: pointer;

    // чтобы верхняя карта была кликабельной
    &:last-child {
      z-index: 10;
    }
  }
}
</style>
