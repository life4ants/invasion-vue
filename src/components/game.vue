<template>
  <div class="game">
    <app-header :phase='game.phase' :endGame='confirmEndGame' :saveGame="saveGameButton" :endTurn="confirmEndTurn"
                :player="game.players[game.turnIndex]" :playersInfo="showAllPlayers" :round="game.round" :attackLine="attackLine">
    </app-header>
    <board :territories="game.territories" :players="game.players"></board>
    <div class="wrapper">
      <invasion-map :openPopup="openPopup" :closePopup="closePopup" :setAttackLine="setAttackLine"></invasion-map>
    </div>
    <popup :show="popup.show" :close="closePopup" :action="popup.action" :players="game.players" :size="popup.size"
           :type="popup.type" :title="popup.title" :content="popup.content" :data="popup.data"></popup>
    <alert :show="alert.show" placement="top-right" type="success" :dismissable="true"
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
    setup, board, popup, alert,
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
      attackLine: ' ',
      popup: {show: false},
      alert: {show: false}
    }
  },
  mounted(){
    window.onbeforeunload = () => this.checkForChanges() ? '' : undefined
    window.addEventListener('keyup', this.keyHandler)
    if (this.game.phase === "initialTroops"){
      const troops = this.currentPlayer.tempReserves
      const content = "<p class='indent'>The territories have been randomly asigned. Each player will distribute troops in turn.</p><p class='indent'><strong>"+ this.currentPlayer.name +"</strong>, start by adding "+(troops > 1 ? troops+" troops": troops+" troop")+".</p>"
      this.openPopup('info', 'small', "Distribute Initial Troops", content)
    }
    else if (this.game.phase === "addTroops")
      this.showReservesMessage()
  },
  destroyed(){
    window.onbeforeunload = undefined
    window.removeEventListener('keyup', this.keyHandler)
  },
  methods: {
    keyHandler(e){
      if (e.key === "x"){
        console.log("you pushed the button!")
      }
    },
    setAttackLine(text, erase){
      if (erase)
        this.attackLine = text
      else
        this.attackLine += text
    },

    showReservesMessage(){
      const data = this.game.turnMessage
      const content = "<p><strong>"+this.currentPlayer.name +", it is your turn.</strong> You have "+this.currentPlayer.terrCount+
                    " territories. This gives you "+data.countryPoints+" troops.</p>"
      let regions = data.messages.length === 0 ? '' :
                "You also get "+data.conPoints+" troops for owning "+data.messages.length+" Regions: "
      let output = content+regions+"<ul>"
      for (let i=0; i<data.messages.length; i++){
        output+= "<li>"+data.messages[i]+"</li>"
      }
      output+="</ul><strong>You have a total of "+(data.countryPoints+data.conPoints)+" troops to distribute.</strong>"
      this.openPopup('info', 'small', this.currentPlayer.name+"\'s Turn!", output)
    },

    confirmEndTurn(){
      const content = this.currentPlayer.name+", do you want to pass troops before ending your turn?"
      this.openPopup("yesnocancel", "small", content, '', (i) => {
        if (i){
          this.openPopup('alert', 'small', "Click on a passing territory, then click on a territory to pass the troops to.")
          this.$store.commit('setPhase', 'pass1')
        }
        else
          console.log("no") })
      //this.$store.commit('nextTurn')
    },

    //============== end game / save game: ==========
    checkForChanges(){
      if (this.game.id === null)
        return true
      const games = JSON.parse(localStorage.invasionGames)
      let gameId = games.findIndex((e) => e.id === this.game.id)
      return !(JSON.stringify(games[gameId]) === JSON.stringify(this.game))
    },
    confirmEndGame(){
      if (this.checkForChanges())
        this.openPopup('confirm', 'small', 'Close Game', "Do you want to save your game before closing?", (x) => this.endGame(x))
      else
        this.openPopup('yesno', 'small', 'Are you sure you want to close the game?', '', (i) => this.close())
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
    saveGameButton(){
      if (this.game.id === null){
        this.openPopup('input', '', 'Save Game', "Please name your game:", (x, name) => {
            if (x){
              this.$store.commit('setName', name)
              this.saveGame()
              this.closePopup()
              this.openAlert("The game was saved!")
            }
            else
              this.closePopup()
          })
      }
      else{
        this.saveGame(this.game.id)
        this.openAlert("The game was saved!")
      }
    },
    saveGame(id){
      let games = JSON.parse(localStorage.invasionGames)
      if (id != null){
        let gameId = games.findIndex((e) => e.id === id)
        if (gameId === -1)
          console.error("error in saving game with id", id)
        games[gameId] = this.game
      }
      else{
        this.$store.commit('setId', games[games.length-1].id+1)
        games.push(this.game)
      }
      localStorage.setItem('invasionGames', JSON.stringify(games))
    },

    // ======= Popups: ===========
    openPopup(type, size, title, content, action, data){
      this.popup = {show: true, type, size, title, content, action, data}
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
  watch: {
    turnMessage(){
      if (this.game.phase === 'initialTroops'){
        const troops = this.currentPlayer.tempReserves
        const content = this.currentPlayer.name + ", now it is your turn to distribute " +(troops > 1 ? troops+" troops.": troops+" troop.")
        this.openPopup('alert', 'small-center', content)
      }
      else if (this.game.phase === 'addTroops'){
        this.showReservesMessage()
      }
      else if (this.game.phase === 'attack1'){
        const content = "Distribution of troops is complete. " + this.currentPlayer.name + ", you may now begin your turn.<br>Click on one of your territories to attack from, then click an opponent's territory to attack."
        this.openPopup('info', 'small-center', 'Distribution Complete', content)
      }
    }
  },
  computed: {
    game(){
      return this.$store.getters.game()
    },
    currentPlayer(){
      return this.game.players[this.game.turnIndex]
    },
    turnMessage(){
      return this.$store.getters.turnMessage()
    }
  }
}
</script>

<style scoped>
  .game{
    position: absolute;
    padding-top: 60px;
  }
  .wrapper{
    background-color: #222;
    width: 1200px;
    height: 1320px;
  }
</style>