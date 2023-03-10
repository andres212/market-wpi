<template>
  <div>
    <NavBarComponent />
    <div class="container-items-store">
      <div v-for=" item in productsRender" :key="item.id">
        <CardComponent :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from '@/components/card';
import NavBarComponent from '@/components/Navbar/navbar.vue'
import { getProducts } from '../api/api';
export default {
  name: 'IndexPage',
  components: {
    CardComponent,
    NavBarComponent
  },
  data: () => {
    return {
      dato: 'Hola desde VUejs',
      productsRender: []
    }
  },
  created: function () {
    this.getAllProducts();
  },
  methods: {
    async getAllProducts () {
      try {
        const resProducts = await getProducts();
        if (resProducts) {
          this.productsRender = resProducts;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.$nuxt.$loading.finish()
      }
    }
  }
}
</script>
<style>
@media (max-width: 800px) {
  .container-items-store {
    flex-direction: column;
    align-items: center;
  }
}

.container-items-store {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}
</style>