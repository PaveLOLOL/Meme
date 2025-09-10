<template>
  <div class="home-page">
    <header class="home-page__header header">
      <h1 class="header__title">Добро пожаловать в Meme</h1>
      <nav class="header__nav nav">
        <ul class="nav__list">
          <li class="nav__item"><a href="#about" class="nav__link">О нас</a></li>
          <li class="nav__item"><a href="#contact" class="nav__link">Контакты</a></li>
        </ul>
      </nav>
    </header>

    <main class="home-page__main main-content">
      <div class="main-content__card meme-card">
        <Card
          :srcFrontImg="allCardsStore.$state.previewCard.srcFrontImg"
          :srcBackImg="allCardsStore.$state.previewCard.srcBackImg"
          :cardId="allCardsStore.$state.previewCard.id"
          :isFlipped="allCardsStore.$state.previewCard.flipped"
        />
      </div>

      <section id="contact" class="main-content__section contact">
        <form class="contact__form" @submit.prevent="submitForm">
          <label class="contact__label">
            Имя:
            <input class="contact__input" v-model="form.name" required />
          </label>
          <label class="contact__label">
            Email:
            <input class="contact__input" v-model="form.email" type="email" required />
          </label>
          <label class="contact__label">
            Сообщение:
            <textarea class="contact__textarea" v-model="form.message"></textarea>
          </label>
          <div class="contact__button-flex">
            <button class="contact__submit" type="submit">Отправить</button>
          </div>
        </form>
      </section>
    </main>

    <footer class="home-page__footer footer">
      <p class="footer__copyright">© 2025 Компания SatoshiTadoshi. Все права защищены.</p>
    </footer>
  </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router'

import '@/styles/main.scss';
import Card from "@/components/cards/Card.vue";
import {useAllCardsStore} from "@/stores/cards";


const form = reactive({
  name: '',
  email: '',
  message: ''
})

const router = useRouter()

const allCardsStore = useAllCardsStore()

function submitForm() {

  if (form.name != '' && form.email != '') {
    router.push('/game')
  }

  alert(`Приятно познакомится, ${form.name}! Теперь ты участник Meme.`)
  form.name = ''
  form.email = ''
  form.message = ''
}


</script>


<style lang="scss">

.home-page__header,
.home-page__footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  text-align: center;
}

.header__title {
  margin-bottom: 16px;
}

.header__nav {
  // пусто, если нужны стили — допиши
}

.nav__list {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 0;
}

.nav__item {
  // пусто, если нужны стили — допиши
}

.nav__link {
  text-decoration: none;
  color: #007acc;
  transition: color 0.2s;
  &:hover {
    color: #005fa3;
  }
}

.main-content {
  padding: 32px 0;
}

.main-content__section {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.services__title,
.contact__title {
  margin-bottom: 8px;
}

.services__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact__form {
  margin-top: 16px;
}

.contact__label {
  display: block;
  margin-bottom: 8px;
}

.contact__input,
.contact__textarea {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 16px;
  box-sizing: border-box;
  font: inherit;
}

.contact__submit {
  background-color: #007acc;
  color: white;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font: inherit;
  border-radius: 3px;
  transition: background 0.2s;
  &:hover {
    background-color: #005fa3;
  }
}

.footer__copyright {
  margin: 0;
}

.contact__button-flex {
  display: flex;
  justify-content: end;
}

</style>
