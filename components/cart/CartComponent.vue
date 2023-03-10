<template>
  <div class="content-items-cart">
    <NavBarComponent />
    <div class="container-web-checkout">
      <div class="content-items-in-cart">
        <div class="container-items">
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
  created: function () {
    this.getItemsCart();
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
      addItemToCart(item.item);
      this.getItemsCart()
      this.getTotalCart();
    },
    removeCountToItem(item) {
      removeItemToCart(item);
      this.getItemsCart()
      this.getTotalCart();
    }
  }
}
</script>
<style src="./style.css">
</style>