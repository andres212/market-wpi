<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="header-modal">
        <h4>Modal de Pagos</h4>
        <div v-on:click="handleCloseEvent()">X</div>
      </div>
      <slot name="body">
      </slot>
      <button>Go Home</button>
    </div>
    <div class="close">
      <img class="close-img" src="" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  methods: {
    handleCloseEvent() {
      console.log('close')
      this.$emit('close')
    }
  }
}
</script>
<style scoped src="./style.css">
</style>