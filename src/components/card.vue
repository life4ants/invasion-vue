<template>
  <div class="card">
  <img :src="url" alt="a playing card" :id="'card'+index" @click="clickHandler(index)">
  <div class="cardTitle">{{name}}</div>
  </div>
</template>

<script>
  import gameData from './game_data.js'

  export default {
    name: 'card',
    props: [ 'value', 'clickHandler', 'index'],
    computed: {
      url(){
        let value = this.value < 92 ? this.value : 91
        return require("assets/CNA ("+value+").png")
      },
      name(){
        return gameData.cards[this.value-1].name
      }
    }
  }
</script>

<style scoped>
.cardTitle {
  position: absolute;
  top: 200px;
  width: 140px;
  left: 18px;
  transform: translateY(-50%);
  color: red;
  text-align: center;
  font-weight: 800;
  font-size: 15px;
  pointer-events: none;
}
img {
  border: 3px solid transparent;
}
.card{
  position: relative;
  padding: 10px;
}
.selected{
  border: 3px solid red;
}
</style>