<template>
  <div class="wrapper">
    <Navbar/>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <Component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>


<script setup lang="ts">
import {useNavBarBarStore} from "@/stores/navBarStore";

import '@/styles/main.scss';

import Navbar from '@/components/navbar/Navbar.vue'
</script>
