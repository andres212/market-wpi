<template>
  <nav :class="!isHome ? 'nav-bar nav-bar-back' : 'nav-bar'">
    <div v-if="!isHome" class="menu-item menu-item-back">
      <router-link to="/">
        <img class="img-back" src="https://cdn-icons-png.flaticon.com/512/625/625967.png" alt="">
      </router-link>
    </div>
    <h4 class="name-store">Home</h4>
    <div class="point"></div>
    <h4 class="name-store">Arrivals</h4>
    <div class="point"></div>
    <h4 class="name-store">Store</h4>
    <div class="point"></div>
    <div v-if="isHome" class="menu-item">
      <router-link to="/cart">Cart</router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBarComponent',
  data: () => {
    return {
      isHome: false,
      back: ''
    }
  },
  created: function() {
    const location = window.location;
    if (location.pathname === '/') {
      this.isHome = true
    }
  },
}
</script>
<style>
  @media (max-width: 800px) {
    .name-store, .point {
      display: none;
    }
  }
  .nav-bar {
    width: 100%;
    background-color: #fff;
    display: flex;
    margin-bottom: 30px;
    justify-content: center;
    height: 5em;
  }
  .point {
    border-radius: 50%;
    height: 0.5em;
    width: 0.5em;
    background-color: #0d0d0e;
    align-self: center;
    margin: 10px 30px;
  }
  .name-store {
    font-weight: 400;
    margin: 0;
    padding: 0;
    align-self: center;
    margin: 10px 30px;
  }
  .nav-bar-back {
    justify-content: flex-start;
  }
  .nav-bar > .menu-item-back {
    text-align: left;
    margin-top: 16px !important;
  }
  .nav-bar > .menu-item {
    align-self: center;
    position: relative;
    text-align: center;
    display: flex;
    transition: 0.4s;
    margin: 10px 30px;
  }
  .nav-bar > .menu-item.active,
  .nav-bar > .menu-item:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  .nav-bar > .menu-item a {
    color: inherit;
    text-decoration: none;
  }

  .img-back {
    height: 20px;
    width: 20px;
    align-self: center;
  }
</style>