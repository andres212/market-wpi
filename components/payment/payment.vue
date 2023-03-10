<template>
  <div class="container-payment">
      <div>
        <h4 class="text-payment">Pago</h4>
        <form
          action="https://checkout.wompi.co/p/"
          method="GET"
          @submit="checkForm"
          novalidate="true"
        >
          <div class="container-inputs-pay">
            <input type="hidden" name="public-key" :value="pub_test" />
            <input type="hidden" name="currency" :value="currency" />
            <input type="hidden" name="amount-in-cents" :value="amount" />
            <input type="hidden" name="reference" :value="ref" />
            <input type="hidden" name="redirect-url" :value="url" />
            <input required class="input-text-payment" type="text" placeholder="Correo pagador" name="customer-data:email" />
            <input required class="input-text-payment" type="text" name="customer-data:full-name" placeholder="Nombre Pagador" />
            <input required class="input-text-payment" type="text" name="customer-data:phone-number" placeholder="Telefono Pagador" />
            <input required class="input-text-payment" type="text" name="customer-data:legal-id-type" placeholder="Tipo de Documento" />
            <input required class="input-text-payment" type="text" name="customer-data:legal-id" placeholder="Doc. Identidad Pagador" />
            <button class="btn-pay-wompi" type="submit">Pagar</button>
          </div>
        </form>
      </div>
  </div>
</template>
<script>
import {PUB_TEST, CURRENCY, URL_REDIRECCION} from '../../assets/const'
import {generateUUID, getTotal} from '../../api/api';
import Modal from '../Modal/Modal.vue';
export default {
  name: 'PaymentComponent',
  components: { Modal },
  data: function() {
    return {
      isModalView: false,
      pub_test: PUB_TEST,
      currency: CURRENCY,
      amount: 0,
      ref: generateUUID(),
      url: URL_REDIRECCION
    }
  },
  created: function() {
    this.setAmount();
  },
  methods: {
    actionModal() {
      this.isModalView = !this.isModalView;
    },
    setAmount() {
      this.amount = getTotal() * 1000;
    },
    checkForm: function(e) {
      let cart = localStorage.getItem('cart');
      cart = JSON.parse(cart)
      if (cart) {
        if (cart.length <= 0) {
          this.$toast.info('Agregar un producto al carrito para continuar con la compra')
        } else {
          return true;
        }
      } else {
        this.$toast.info('Agregar un producto al carrito para continuar con la compra')
      }
      e.preventDefault();
    }
  }
}
</script>
<style>
@media (max-width: 900px) {
  .container-payment {
    width: 90% !important;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.btn-pay-wompi {
  border-radius: 4px;
  height: 3em;
  width: 5em !important;
  border: 1px solid #cecece;
  cursor: pointer;
  width: 12vw;
  margin-top: 10px;
  align-self: center;
  background-color: transparent;
  transition: 0.4s;
}

.btn-pay-wompi:hover {
  background-color: #21331d;
  color: #fff;
}

.container-payment {
  width: 45%;
  height: 80vh;
  background-color: #fff;
  border-radius: 8px;
}

.container-inputs-pay {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.input-text-payment::placeholder {
  margin-left: 10px;
  padding: 10px;
}

.input-text-payment {
  padding: 2px;
  margin: 10px;
  height: 3em;
  width: 80%;
  align-self: center;
  border: 1px solid #dededc;
  border-radius: 6px;
}

.text-payment {
  text-align: center;
  font-size: 22px;
  font-weight: 400;
}
</style>