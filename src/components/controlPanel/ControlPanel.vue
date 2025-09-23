<template>
  <div class="control-panel">
    <button
      v-for="(btn, index) in buttons"
      :key="index"
      class="control-panel__btn"
      :class="`control-panel__btn--${btn.type}`"
      @click="onClick(btn)"
    >
      {{ btn.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface ButtonItem {
  label: string
  type: 'primary' | 'secondary' | 'danger'
}

defineProps<{
  buttons: ButtonItem[]
}>()

const emit = defineEmits<{
  (e: 'action', button: ButtonItem): void
}>()

function onClick(btn: ButtonItem) {
  emit('action', btn)
}
</script>

<style lang="scss" scoped>
.control-panel {
  display: flex;
  gap: 16px;
  padding: 20px;
  width: calc(100vw - 160px);
  margin: 10px;
  background-color: #6a0dad; // фон панели
  border-radius: 20px;
  justify-content: center;

  &__btn {
    border: none;
    border-radius: 12px;
    padding: 14px 28px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 4px #6a0dad;
    transition: transform 0.1s ease, box-shadow 0.1s ease;

    &:active {
      transform: translateY(4px);
      box-shadow: 0 0 #6a0dad;
    }

    &--primary {
      background: linear-gradient(to bottom, #d36eff, #a64dff);
    }

    &--secondary {
      background: linear-gradient(to bottom, #6effd3, #4da6ff);
    }

    &--danger {
      background: linear-gradient(to bottom, #ff6e6e, #ff4d4d);
    }
  }
}
</style>
