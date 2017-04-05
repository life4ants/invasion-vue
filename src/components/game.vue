<template>
  <setup v-if="phase === 'setup'" :start='startGame' :cancel="close"></setup>
  <div v-else class="game">
    <app-header :phase='phase'></app-header>
    <div class='dashboard'>
      Hello this is the game
    </div>
  </div>
</template>

<script>
import setup from './setup'
import header from './header'

export default {
  name: 'game',
  components: {
    setup, 'app-header': header
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

<style >

</style>