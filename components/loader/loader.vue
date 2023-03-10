<template>
    <div class="loading-page" v-if="loading">
        <div class="spinner"></div>
    </div>   
</template>
  
  <script>
    export default {
      data: () => ({
        loading: false
      }),
      methods: {
        start() {
          this.loading = true
        },
        finish() {
          this.loading = false
        }
      }
    }
  </script>
  
  <style>
.loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    padding-top: 200px;
    font-size: 30px;
    font-family: sans-serif;
}
.spinner {
    width: 40px;
    height: 40px;
    margin: 100px auto;
    background-color: #333;

    border-radius: 100%;  
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
    0% { -webkit-transform: scale(0) }
    100% {
        -webkit-transform: scale(1.0);
        opacity: 0;
    }
}

@keyframes sk-scaleout {
    0% { 
        -webkit-transform: scale(0);
        transform: scale(0);
    } 100% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
        opacity: 0;
    }
}
  </style>