<template>
  <div v-if="phase === 'setup'" class="bg">
    <setup :start='startGame' :cancel="close"></setup>
  </div>
  <div v-else class="bg">
    <app-header :phase='phase' :action='close' :pop="cheater"></app-header>
    <div class="game">
      <board :territories="territories" ></board>
      <div class="wrapper">
        <invasion-map :clicker="clicker"></invasion-map>
      </div>
    </div>
  </div>
</template>

<script>
import setup from './setup'
import header from './header'
import invasionMap from './invasion_map'
import board from './board'
import gameData from './game_data.js'
import $ from 'jquery'

export default {
  name: 'game',
  components: {
    setup,
    board,
    'app-header': header,
    'invasion-map': invasionMap
  },
  props: [
    'close', 'initial'
  ],
  data(){
    return {
      phase: this.initial,
      selected: null,
      players: [],
      territories: []
    }
  },
  methods: {
    startGame(players){
      this.players = players
      this.phase = 'playing'
      this.populate()
    },

    cheater(){
      let p = [{name: "Green Fred", code: 14}, {name: "Yellow Bob", code: 3}]
      this.players = p
      this.randomlySelectTerrs()
    },

    populate(){
      let t = []
      for(let i=0; i<90; i++){
        t[i] = {id: i+1, reserves: i+1, owner: Math.floor(Math.random()*100)}
      }
      this.$set(this, 'territories', t)
    },

    randomlySelectTerrs(){
      let ar = [];
      for (let i=0; i<90; i++) //fill ar with values 0-89
        ar.push(i)
      let array = gameData.shuffle(ar) //shuffle it up!
      let t = []

      for (let i=0; i<90;) {       //loop thru the players and asign the shuffled countries to them
        for (let j=this.players.length-1; j >= 0; j--) {
          if (i === 90)
            break;
          else {
            t[array[i]] = {id: array[i]+1, reserves: 1, owner: this.players[j].code }
          }
          i++;
        }
      }
      this.$set(this, 'territories', t)
    },

    clicker(i){
      if (this.selected){
        $('.territory'+this.selected).removeClass("selected")
      }
      $('.territory'+i).addClass("selected")
      this.selected = i
      let reserves = this.territories[i-1].reserves
      this.$set(this.territories[i-1], "reserves", reserves+1)
    }
  }
}
</script>

<style scoped>
  .game{
    padding-top: 45px;
  }
  .wrapper{
    background-color: #222;
    width: 1200px;
    height: 1320px;
  }
</style>