<template>
  <div class="game">
    <app-header :phase='game.phase' :action='close' :endTurn="nextTurn" :alert="foo"
                :player="players[game.turnIndex]" :playersInfo="showAllPlayers">
    </app-header>
    <board :territories="territories" :players="players"></board>
    <div class="wrapper">
      <invasion-map :clicker="clicker"></invasion-map>
    </div>
    <popup :show="popup.show" :close="closePopup" :action="popup.action" :players="players" :size="popup.size"
           :type="popup.type" :title="popup.title" :content="popup.content"></popup>
    <alert :show="alert.show" placement="top-right" type="info" :dismissable="true"
            width="200px" :duration="1500" :close="closeAlert">{{alert.content}}</alert>
    <app-footer :phase="game.phase"></app-footer>
  </div>
</template>

<script>
import setup from './setup'
import header from './header'
import invasionMap from './invasion_map'
import board from './board'
import gameData from './game_data.js'
import popup from './popup'
import alert from './Alert'
import footer from './footer'

export default {
  name: 'game',
  components: {
    setup,
    board,
    popup,
    alert,
    'app-footer': footer,
    'app-header': header,
    'invasion-map': invasionMap
  },
  props: [
    'close', 'id'
  ],
  data(){
    return {
      selected: null,
      popup: {show: false},
      alert: {show: false}
    }
  },
  mounted(){
    if (this.game.phase === "initialTroops"){
      const content = "The territories have been randomly asigned. Each player will distribute troops in turn.<br><strong>"+
                      this.currentPlayer.name +"</strong>, start by adding "+this.currentPlayer.tempReserves +" troops."
      this.openPopup('info', '', "Distribute Initial Troops", content)
    }
  },
  methods: {
    clicker(i){
      if (this.game.phase === 'initialTroops'){
        if (this.territories[i-1].owner === this.game.turnIndex)
          this.$store.commit('initialTroops', {gameId: this.id, terrId: i-1, turnIndex: this.game.turnIndex})
        else
          this.openPopup('alert', 'small-center','That territory does not belong to you!')
      }
      else{
        if (this.selected){
          $('.territory'+this.selected).removeClass("selected")
        }
        $('.territory'+i).addClass("selected")
        this.selected = i
        this.$store.commit('setReserves', {gameId: this.id, terrId: i-1, amount: 1})
      }
    },

    nextTurn(){
      this.$store.commit('nextTurn', this.id)
    },

    foo(){
      this.openPopup('alert', 'small-center','That territory does not belong to you!')
    },

    // ======= Popups: ===========
    openPopup(type, size, title, content, action){
      this.popup = {show: true, type, size, title, content, action}
    },

    closePopup(){
      this.popup = {show: false}
    },

    showAllPlayers(){
      this.openPopup('players', 'small', 'Players Info')
    },

    openAlert(content){
      this.alert = {show: true, content}
    },
    closeAlert(){
      this.alert.show = false
    }
  },
  computed: {
    players(){
      return this.$store.getters.players(this.id)
    },
    territories(){
      return this.$store.getters.territories(this.id)
    },
    game(){
      return this.$store.getters.game(this.id)
    },
    currentPlayer(){
      return this.players[this.game.turnIndex]
    }
  }
}
</script>

<style scoped>
  .game{
    padding-top: 60px;
  }
  .wrapper{
    background-color: #222;
    width: 1200px;
    height: 1320px;
  }
</style>