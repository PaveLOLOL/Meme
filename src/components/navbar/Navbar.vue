<template>
  <div>
    <nav
      class="navbar"
      :class="{'open': isOpen}"
      @click="toggle"
    >
      <div class="navbar__header"></div>
      <div class="navbar__body" @click="toggle"></div>
      <div class="navbar__footer"></div>

    </nav>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useAuthStore} from '@/stores/auth';
import {useNavBarBarStore} from "@/stores/navBarStore";

const rightBarStore = useNavBarBarStore();
const authStore = useAuthStore();

const isOpen = ref(false);


function toggle() {
    isOpen.value = !isOpen.value;
}

</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 6;
  height: 100%;
  overflow-x: hidden;
  background: var(--viol-4);
  width: 40px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 22px;
  color: var(--col-8);
  font-weight: 600;
  transition: 0.3s width ease;

  &.open {
    width: 180px;
    border-right: 1px solid var(--col-3);
  }

  &__header {
    display: flex;
    align-items: baseline;
    padding: 5px 11px;
  }

}
</style>
