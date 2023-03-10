<template>
  <div class="content-items-cart">
    <NavBarComponent />
    <div class="container-web-checkout">
      <div class="content-items-in-cart">
        <div v-if="productsInCart.length > 0" class="container-items">
          <div
            v-for="item in productsInCart" :key="item.item.id"
            class="content-item-in-cart"
          >
            <div class="content-item-cart-image">
              <img :src="item.item.image" alt="image">
            </div>
            <div class="content-item-cart-info">
              <p class="info-title">{{ cutTitle(item.item.title) }}</p>
              <p class="info-count">Cant: {{ item.count }}</p>
              <p class="info-to">$ {{ item.total }}</p>
            </div>
            <div class="content-actions-cart">
              <button class="btn-action-cart" v-on:click="addCountToItem(item)">+</button>
              <p class="info-count">{{ item.count }}</p>
              <button class="btn-action-cart" v-on:click="removeCountToItem(item)">-</button>
            </div>
          </div>
        </div>
        <div v-if="productsInCart.length <= 0" class="container-items">
          <div class="cart-emp">
            <p>
              Carrito vacio 😔
            </p>
          </div>
        </div>
        <div class="footer-info-cart">
          <div class="line"></div>
          <div class="info-total-shop">
            <p>Total (COP):</p>
            <p>$ {{ getTotalCart() }}</p>
          </div>
        </div>
      </div>
      <PaymentComponent />
    </div>
  </div>
</template>
<script>
import { getItemsFromCart, addItemToCart, removeItemToCart, getTotal, splitTitle } from '../../api/api';
import PaymentComponent from '../payment/payment.vue';
import NavBarComponent from '@/components/Navbar/navbar.vue'
export default {
  name: 'CartComponent',
  components: {PaymentComponent, NavBarComponent},
  data: () => {
    return {
      productsInCart: []
    }
  },
  mounted: function() {
    this.getItemsCart();
  },
  created: function () {
  },
  methods: {
    cutTitle(title = '') {
      return splitTitle(title)
    },
    getTotalCart() {
      return getTotal();
    },
    getItemsCart() {
      this.productsInCart = getItemsFromCart();
    },
    addCountToItem(item) {
      this.$root.$loading.start()
      setTimeout(() => {
        const response = addItemToCart(item.item);
        if (response) {
          this.$toast.success('Producto agregado')
        } else {
          this.$toast.error('Error en agregar producto')
        }
        this.getItemsCart()
        this.getTotalCart();
        this.$root.$loading.finish()
      }, 1500);
    },
    removeCountToItem(item) {
      this.$root.$loading.start()
      setTimeout(() => {
        const response = removeItemToCart(item);
        if (response) {
          this.$toast.success('Producto eliminado')
        } else {
          this.$toast.error('Error en remover producto')
        }
        this.getItemsCart()
        this.getTotalCart();
        this.$root.$loading.finish()
      }, 1500);
    }
  }
}
</script>
<style src="./style.css">
</style>