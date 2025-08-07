<template>
  <div class="wrapper">
    <Navbar />
    <div class="main">
      <header class="header">
        <h1>Добро пожаловать на наш сайт!</h1>
        <nav class="nav">
          <ul>
            <li><a href="#about">О нас</a></li>
            <li><a href="#services">Услуги</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </nav>
      </header>

      <main class="main-content">
        <section id="about">
          <h2>О нашей компании</h2>
          <p>Краткое описание компании, миссия и ценности.</p>
        </section>

        <section id="services">
          <h2>Наши услуги</h2>
          <ul>
            <li>Услуга 1</li>
            <li>Услуга 2</li>
            <li>Услуга 3</li>
          </ul>
        </section>

        <section id="contact">
          <h2>Связаться с нами</h2>
          <form @submit.prevent="submitForm">
            <label>
              Имя:
              <input v-model="form.name" required />
            </label>
            <label>
              Email:
              <input v-model="form.email" type="email" required />
            </label>
            <label>
              Сообщение:
              <textarea v-model="form.message" required></textarea>
            </label>
            <button type="submit">Отправить</button>
          </form>
        </section>
      </main>

      <footer class="footer">
        <p>© 2025 Моя Компания. Все права защищены.</p>
      </footer>
    </div>

  </div>
</template>


<script setup lang="ts">
import {useAuthStore} from '@/stores/auth';
import {reactive} from 'vue';
import {useNavBarBarStore} from "@/stores/navBarStore";

import '@/styles/main.scss';

import Navbar from '@/components/navbar/Navbar.vue'

const authStore = useAuthStore();
const navBarBarStore = useNavBarBarStore();


const form = reactive({
  name: '',
  email: '',
  message: ''
})

function submitForm() {
  alert(`Спасибо, ${form.name}! Ваше сообщение отправлено.`)
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>


<style lang="scss">
.body {
  background-color: green;
  color: green;
}

.wrapper {

}

.header, .footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  text-align: center;
}

.nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.nav a {
  text-decoration: none;
  color: #007acc;
}

.main-content section {
  margin-bottom: 2rem;
}

form label {
  display: block;
  margin-bottom: 0.5rem;
}

form input, form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
}

button {
  background-color: #007acc;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
}

button:hover {
  background-color: #005fa3;
}
</style>
