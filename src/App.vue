<template>
  <h1>TicTocToe Game + AI</h1>
  <TicTacToe />
</template>

<script>
import TicTacToe from './components/TicTacToe.vue'
export default {
  components: {
    TicTacToe
  }
}
</script>
<style>
h1 {
  font-size: 25px;
}
#app {
  font-family: 'Spline Sans Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

@media (min-width: 768px) {
  h1 {
    font-size: 32px !important;
  }
}
</style>
