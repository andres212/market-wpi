<template>
  <div class="content-market-card">
    <img class="image-content-market-card" :src="item.image" alt="image">
    <div>
      <p class="title-name-card">{{cutTitle(item.title)}}</p>
      <p class="price-card">Precio: $ {{ item.price }}</p>
      <p class="count-card">Cantidad: {{ item.rating.count }}</p>
      <p class="rate-card">Rate: {{item.rating.rate}}</p>
    </div>
    <div class="line" />
    <div class="content-add-to-cart">
      <button class="btn-add-to-cart" v-on:click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>
<script>
import { addItemToCart, splitTitle } from '../../api/api.js';
export default {
    name: 'CardComponent',
    props: {
      item: {
        id: String,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: {
          rate: String,
          count: Number
        }
      }
    },
    data: () => {
      return {}
    },
    methods: {
      addToCart() {
        this.$root.$loading.start()
        setTimeout(() => {
          const response = addItemToCart(this.item);
          if (response) {
            this.$toast.success('Producto agregado')
          } else {
            this.$toast.error('Error en agregar producto')
          }
          this.$root.$loading.finish()
        }, 1500);
      },
      cutTitle(title) {
        return splitTitle(title);
      }
    },
}
</script>
<style src="./style.css"></style>