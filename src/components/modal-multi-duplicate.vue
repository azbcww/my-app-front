<template>
  <div class = "modal-window">
    <h4>Is Multi modal2</h4>

    <button @click = "pushModal(ModalMultiDuplicate)">Open one more</button>
    <button @click = "openModal(ModalMultiDuplicate)">Open only one</button>
    <button @click = "closeModal()">Close all</button>

  </div>
</template>

<script setup>
import {container as ModalContainer, openModal, pushModal, closeModal} from 'jenesius-vue-modal'
import ModalMultiDuplicate from "./modal-multi.vue";

</script>

<style scoped>


</style>