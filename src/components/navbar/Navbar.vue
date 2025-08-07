<template>
  <div>
    <nav
      class="navbar"
      :class="{'open': isOpen}"
      @click="toggle"
    >
      <div class="navbar__header">
         <span class="navbar__logo">
            <Transition name="swipe-x">
                <BrandSvg v-if="isOpen" class="navbar__logo-icon"/>
              <BrandShortSvg v-else class="navbar__logo-short-icon"/>
            </Transition>
      </span>
      </div>
      <div class="navbar__body" @click="toggle"></div>
      <div class="navbar__footer"></div>

    </nav>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useAuthStore} from '@/stores/auth';
import {useNavBarBarStore} from "@/stores/navBarStore";
import BrandSvg from "@/components/app-svg/BrandSvg.vue"
import BrandShortSvg from "@/components/app-svg/BrandShortSvg.vue"

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
  width: 70px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 22px;
  color: var(--col-8);
  font-weight: 600;
  transition: 0.3s width ease;

  &.open {
    width: 200px;
    border-right: 1px solid var(--col-3);
  }


  &__logo, &__logo-icon {
    width: 180px;
    height: 75px;
    margin-right: 8px;
    max-height: 75px;
    display: inline-block; /* чтобы transform работал адекватно */
    will-change: transform, opacity;
  }

  &__logo-short-icon {
    display: flex;
    justify-content: flex-start;
    height: 75px;
    max-height: 75px;
  }

  &__header {
    display: flex;
    align-items: baseline;
    padding: 5px 11px;
  }

}

// не мешая основной логике (вынесена)
.swipe-x-enter-active,
.swipe-x-leave-active {
  transition:
    transform 0.07s cubic-bezier(.4,0,.2,1),
    opacity 0.07s;
  transform-origin: left; /* для слева-направо */
}

.swipe-x-enter-from,
.swipe-x-leave-to {
  transform: scaleX(0);
  opacity: 0;
}
.swipe-x-enter-to,
.swipe-x-leave-from {
  transform: scaleX(0);
  opacity: 1;
}
</style>
