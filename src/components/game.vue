<template>
  <div v-if="phase === 'setup'" class="bg">
    <setup :start='startGame' :cancel="close"></setup>
  </div>
  <div v-else class="bg">
    <app-header :phase='phase' :action='close' :player="players[turnIndex]" :playersInfo="showAllPlayers"></app-header>
    <div class="game">
      <board :territories="territories" :players="players"></board>
      <div class="wrapper">
        <invasion-map :clicker="clicker"></invasion-map>
      </div>
      <popup :show="popup.show" :close="closePopup" :action="popup.action" :players="players"
             :type="popup.type" :title="popup.title" :content="popup.content"></popup>
    </div>
  </div>
</template>

<script>
import setup from './setup'
import header from './header'
import invasionMap from './invasion_map'
import board from './board'
import gameData from './game_data.js'
import popup from './popup'
import $ from 'jquery'

export default {
  name: 'game',
  components: {
    setup,
    board,
    popup,
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
      popup: {show: false},
      players: [{name: 'loading players...', code: -1}],
      territories: [],
      turnIndex: 0
    }
  },
  mounted(){
    if (this.phase === 'playing')
       this.cheater()
    console.log("game was mounted with phase:", this.phase)
  },
  methods: {
    startGame(players){
      this.players = players
      this.phase = 'playing'
      this.randomlySelectTerrs()
    },

    cheater(){
      let p = [{code:22,name:"Fred",terrCount:15},
              {code:53,name:"Bill",terrCount:15},
              {code:16,name:"Roslyn",terrCount:15},
              {code:41,name:"Maria",terrCount:15},
              {code:36,name:"Kyle",terrCount:15},
              {code:8,name:"Edward",terrCount:15}]
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
      if (this.players.length === 0)
        return console.log('ERROR: there are no players')
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
            t[array[i]] = {id: array[i]+1, reserves: 1, owner: j}
            this.players[j].terrCount++
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
    },

    // ======= Popups: ===========
    openPopup(type, title, content, action){
      this.popup = {show: true, type: type, title: title, content: content, action: action}
    },

    closePopup(){
      this.popup = {show: false}
    },

    showAllPlayers(){
      this.openPopup('players', 'Players Info')
    }
  },
  computed: {

  }
}
</script>

<style scoped>
  .game{
    padding-top: 75px;
  }
  .wrapper{
    background-color: #222;
    width: 1200px;
    height: 1320px;
  }
</style>