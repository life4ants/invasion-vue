<template>
  <div class="game">
    <app-header :phase='game.phase' :endGame='confirmEndGame' :saveGame="saveGame" :endTurn="nextTurn"
                :player="game.players[game.turnIndex]" :playersInfo="showAllPlayers">
    </app-header>
    <board :territories="game.territories" :players="game.players"></board>
    <div class="wrapper">
      <invasion-map :clicker="clicker"></invasion-map>
    </div>
    <popup :show="popup.show" :close="closePopup" :action="popup.action" :players="game.players" :size="popup.size"
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
    'close'
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
      this.openPopup('info', 'small', "Distribute Initial Troops", content)
    }
  },
  watch: {
    showPopup(){
      if (this.game.phase === 'initialTroops'){
        const content = this.currentPlayer.name + ", now it is your turn to distribute " + this.currentPlayer.tempReserves + " troops."
        this.openPopup('alert', 'small-center', content)
      }
    }
  },
  methods: {
    clicker(i){
      if (this.game.phase === 'initialTroops'){
        if (this.game.territories[i-1].owner === this.game.turnIndex)
          this.$store.dispatch('initialTroops', {terrId: i-1, turnIndex: this.game.turnIndex})
        else
          this.openPopup('alert', 'small-center','That territory does not belong to you!')
      }
      else{
        if (this.selected){
          $('.territory'+this.selected).removeClass("selected")
        }
        $('.territory'+i).addClass("selected")
        this.selected = i
        this.$store.commit('setReserves', {terrId: i-1, amount: 1})
      }
    },

    nextTurn(){
      this.$store.commit('nextTurn')
    },

    confirmEndGame(){
      if (this.game.id === null){
        this.openPopup('confirm', 'small', 'Close Game', "Do you want to save your game before closing?", (x) => this.endGame(x))
      }
      else {
        if (JSON.stringify(JSON.parse(localStorage.invasionGames)[this.game.id]) === JSON.stringify(this.game))
          this.openPopup('yesno', 'small', 'Are you sure you want to close the game?', '', () => this.close() )
        else
          this.openPopup('confirm', 'small', 'Close Game', "Do you want to save your game before closing?", (x) => this.endGame(x))
      }
    },

    endGame(save){
      if (save){
        if (this.game.id != null){
          this.saveGame(this.game.id)
          this.close()
        }
        else {
          this.openPopup('input', '', 'Save Game', "Please name your game:", (x, name) => {
            if (x){
              this.$store.commit('setName', name)
              this.saveGame()
              this.close()
            }
            else
              this.confirmEndGame()

          })
        }
      }
      else
        this.close()
    },

    saveGame(id){
      let games = JSON.parse(localStorage.invasionGames)
      if (id != null){
        games[id] = this.game
      }
      else{
        this.$store.commit('setId', games.length)
        games.push(this.game)
      }
      localStorage.setItem('invasionGames', JSON.stringify(games))
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
    game(){
      return this.$store.getters.game()
    },
    currentPlayer(){
      return this.game.players[this.game.turnIndex]
    },
    showPopup(){
      return this.$store.getters.showPopup()
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