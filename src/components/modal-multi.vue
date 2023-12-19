<template>
  <div class = "modal-window">
    <p>{{ title }}</p>

    <button @click = "pushModal(ModalMultiDuplicate)">Open one more</button>
    <button @click = "openModal(ModalMultiDuplicate)">Open only one</button>
    <button @click = "closeModal()">Close all</button>

  </div>
</template>

<script setup lang="ts">
import {container as ModalContainer, openModal, pushModal, closeModal} from 'jenesius-vue-modal'
import ModalMultiDuplicate from "./modal-multi-duplicate.vue";

interface Props {
    title: {type: string, default: ''}
}

defineProps<Props>()
</script>

<style scoped>
.modal-window {
    width: 300px;
    background: white;
    container: body;
}
</style>