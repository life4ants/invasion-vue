<template>
  <div>
    <div v-if="phase === 'setup'" class="flex-wrapper">
      <setup :start='startGame' :cancel="close"></setup>
    </div>
    <div v-else class="game">
      <app-header :phase='phase'></app-header>
      <div class="wrapper">
        <invasion-map></invasion-map>
      </div>
    </div>
  </div>
</template>

<script>
import setup from './setup'
import header from './header'
import invasionMap from './invasion_map'

export default {
  name: 'game',
  components: {
    setup,
    'app-header': header,
    'invasion-map': invasionMap
  },
  props: [
    'close'
  ],
  data(){
    return {
      phase: 'setup',
      players: []
    }
  },
  methods: {
    startGame(players){
      this.players = players
      this.phase = 'playing'
    }
  }
}
</script>

<style scoped>
  .game{
    padding: 45px 0 0 340px;
  }
  .wrapper{
    background-color: #222;
    width: 1200px;
    height: 1320px;
  }
</style>