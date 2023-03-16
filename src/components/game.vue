<template>
  <div class="game">
    <app-header :phase='game.phase' :round="game.round" :player="game.players[game.turnIndex]" :canTurnInCards="game.canTurnInCards"
                :attackLine="attackLine" :canCancel="passData.canCancel" :menu="buttonRouter" :paused="aiPaused">
    </app-header>
    <board :territories="game.territories" :players="game.players"></board>
    <div class="wrapper">
      <invasion-map :clicker="clicker"></invasion-map>
    </div>
    <popup :show="popup.show" :closePopup="closePopup" :action="popup.action" :size="popup.size" :type="popup.type"
           :title="popup.title" :content="popup.content" :data="popup.data" :repeatAttack="repeatAttack"></popup>
    <alert :show="alert.show" placement="top-right" type="success" :dismissable="true"
            width="200px" :duration="1500" :close="closeAlert">{{alert.content}}</alert>
    <app-footer :phase="game.phase" :terr="selected"></app-footer>
    <AIplayer :computerAttack="computerAttack" :computerEndTurn="computerEndTurn"
              :trigger="aiTrigger" :paused="aiPaused"></AIplayer>
  </div>
</template>

<script>
import header from './header'
import invasionMap from './invasion_map'
import board from './board'
import gameData from './game_data.js'
import popup from './popup'
import alert from './Alert'
import footer from './footer'
import sounds from './sounds.js'
import AIplayer from './AIplayer'

export default {
  name: 'game',
  components: {
    board, popup, alert, AIplayer,
    'app-footer': footer,
    'app-header': header,
    'invasion-map': invasionMap
  },
  props: [
    'close'
  ],
  data(){
    return {
      attackLine: '',
      popup: {show: false},
      alert: {show: false},
      attack: {},
      passData: {terrs: [], long: 0, short: 0, canCancel: true, passer: null, passie: null},
      selected: null,
      welcome: true,
      aiTrigger: 0,
      aiPaused: false,
      aiSpeed: 500
    }
  },
  mounted(){
    window.onbeforeunload = () => this.checkForChanges() ? '' : undefined
    if (!this.currentPlayer.isBot)
      this.watchTurnMessage()
  },
  destroyed(){
    window.onbeforeunload = undefined
    if (this.game.phase === "gameOver")
      sounds.gameOver.pause()
  },
  watch: {
    turnMessage(){
      this.watchTurnMessage()
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
      return this.game.turnMessage
    }
  },
  methods: {
    // ========= Watch action responders: =========
    watchTurnMessage(){
      switch (this.game.turnMessage.type){
        case 'InTrps':
          if (this.welcome && !this.currentPlayer.isBot){
            this.showWelcomeMessage()
            this.welcome = false
          }
          else {
            const troops = this.currentPlayer.tempReserves
            let content = this.currentPlayer.name + ", now it is your turn to distribute " +(troops > 1 ? troops+" troops.": troops+" troop.")
             this.openPopup('alert', 'small-center', content)
          }
          break
        case 'Trps':
          this.showReservesMessage()
          sounds.playStartTurn()
          break
        case 'StTurn':
          if (['attack1', 'attack2'].includes(this.game.phase)){
            if (this.currentPlayer.isBot){
              this.openPopup('alert', 'small-center', this.currentPlayer.name+"\'s Turn!")
            }
            else {
              this.openPopup('info', 'small-center', 'Distribution Complete', 
                "Distribution of troops is complete. " + this.currentPlayer.name + 
                ", you may now begin your turn.<br>Click on one of your territories to attack from, then click an opponent's territory to attack.")
            }
          }
          else { //this should only run on Mounted(). phase should be pass1 or pass2
            if (this.game.phase === 'pass2')
              this.$store.commit("setPhase", 'pass1')
            this.passingInfo()
          }
          break
        case 'Cards':
          this.showCardsMessage()
      }
    },
    showWelcomeMessage(){
      const troops = this.currentPlayer.tempReserves
      const content = "<p class='indent'>The territories have been randomly asigned. Each player has been give a number of troops to distribute before the game starts. Pick your position and defend it well!</p><p class='indent'>Each player will distribute troops in turn. <strong>"+ this.currentPlayer.name +"</strong>, start by adding "+(troops > 1 ? troops+" troops": troops+" troop")+".</p>"
      this.openPopup('info', 'small', "Distribute Initial Troops", content)
    },
    showReservesMessage(){
      const data = this.game.turnMessage.data
      let content = "<p><strong>"+this.currentPlayer.name +", it is your turn.</strong> You have "+this.currentPlayer.terrCount+
                    " territories. This gives you "+data.countryPoints+" troops.</p>"
      if (data.messages.length === 1)
        content += "<p>You also get "+data.messages[0]+".</p>"
      else if (data.messages.length > 1){
        content += "You also get "+data.conPoints+" troops for owning "+data.messages.length+" Regions: <ul>"
        for (let i=0; i<data.messages.length; i++){
          content+= "<li>"+data.messages[i]+"</li>"
        }
        content += "</ul>"
      }
      content+="<strong>You have a total of "+(data.countryPoints+data.conPoints)+" troops to distribute.</strong>"
      this.openPopup('callback', 'small', this.currentPlayer.name+"\'s Turn!", content, () => this.checkCards())
    },

    showCardsMessage(){
      const data = this.turnMessage.data
      let content = "<p>"+this.currentPlayer.name+", you get "+data.reserves+" troops for turning in cards.</p>"
      if (data.ids.length > 0)
        content += "Troops have been added to "+(data.ids.length === 1 ? "this territory " : "these territories ")+"that you own:"
      content += "<ul>"
      for (let i=0; i<data.ids.length; i++){
        content+= "<li>2 Troops on "+gameData.territoryInfo[data.ids[i]].name+"</li>"
      }
      content+="</ul><strong>You have a total of "+(this.currentPlayer.reserves)+" troops to distribute.</strong>"
      this.openPopup('info', 'small', "Cards were turned in", content)
    },

    //======== Routers/setters: =======
    buttonRouter(i){
      switch(i){
        case 'ET':
          this.endTurnButton()
          break
        case 'EG':
          this.confirmEndGame()
          break
        case 'SG':
          this.saveGameButton()
          break
        case 'PI':
          this.showAllPlayers()
          break
        case 'CPT':
          this.cancelPassTroops()
          break
        case 'TIC':
          this.turnInCards()
          break
        case 'SMC':
          this.showCards(false)
          break
        case 'Set':
          this.showPlayerSettings()
          break
        case 'PAI':
          if (this.aiPaused){
            this.aiPaused = false
            this.aiTrigger++
          }
          else
            this.aiPaused = true
          break
        case 'AIS':
          this.changeAiSpeed()
          break
      }
    },
    clicker(i){
      switch(this.game.phase){
        case 'initialTroops':
        case 'addTroops':
          this.addTroops(i)
          break
        case 'attack1':
          this.selectAttacker(i)
          break
        case 'attack2':
          this.selectAttacked(i)
          break
        case 'pass1':
          this.selectPasser(i)
          break
        case 'pass2':
          this.selectPassie(i)
          break
        default:
          if (this.selected)
             $('.territory'+this.selected).removeClass("selected")
          this.select(i)
      }
    },
    setAttackLine(command, id){
      switch(command){
        case 0:
          this.attackLine = ''
          break
        case 1:
          this.attackLine = gameData.territoryInfo[id].name + " vs "
          break
        case 2:
          this.attackLine += gameData.territoryInfo[id].name
      }
    },
    select(territory){
      $('.territory'+territory).addClass("selected")
      this.selected = territory
    },
    addTroops(i){
      if (this.game.territories[i-1].owner === this.currentPlayer.id){
        this.$store.dispatch(this.game.phase, i-1)
        sounds.playTroops()
      }
      else
        this.openPopup('alert', 'small-center','That territory does not belong to you!')
    },
    getPlayerById(id){
      const index = this.game.players.findIndex((e) => e.id === id)
      return this.game.players[index]
    },

    //========== Attacking/Conquering: ============
    selectAttacker(i){
      let terr = this.game.territories[i-1]
      if (terr.owner === this.currentPlayer.id){
        if (terr.reserves > 1){
          this.select(i)
          this.setAttackLine(1, i)
          this.$store.commit('setPhase', 'attack2')
          sounds.attack1.play().catch((e) => {
            console.log(e)
            console.log("reloading attack1 sound")
            sounds.attack1.load()
          })
        }
        else
          this.openPopup('alert', 'small-center','That territory does not have enough troops to attack!')
      }
      else
        this.openPopup('alert', 'small-center','That territory does not belong to you!')
    },
    selectAttacked(i){
      if (this.game.territories[i-1].owner === this.currentPlayer.id){
        if (this.game.territories[i-1].reserves > 1){
          $('.territory'+this.selected).removeClass("selected")
          this.select(i)
          this.setAttackLine(1, i)
        }
        else
          this.openPopup('alert', 'small-center', 'That territory does not have enough troops to attack!')
      }
      else {
        if (gameData.canFight(this.selected, i)){
          sounds.attack2.play().catch((e) => {
            console.log(e)
            console.log("reloading attack2 sound")
            sounds.attack2.load()
          })
          $('.territory'+i).addClass("selected")
          this.setAttackLine(2,i)
          const attackTerr = this.game.territories[this.selected-1]
          const defendTerr = this.game.territories[i-1]
          this.attack = {attackTerr, defendTerr}
          this.pickDice1()
        }
        else
          this.openPopup('alert', 'small-center','Those territories do not border!')
      }
    },
    computerAttack(attackId, defendId){
      this.select(attackId+1)
      this.select(defendId+1)
      this.setAttackLine(1, attackId+1)
      this.setAttackLine(2, defendId+1)
      const attackTerr = this.game.territories[attackId]
      const defendTerr = this.game.territories[defendId]
      this.attack = {attackTerr, defendTerr}
      let redDice = attackTerr.reserves > 3 ? 3
                    : attackTerr.reserves > 2 ? 2 : 1
      setTimeout(() => this.pickDice2(redDice), this.aiSpeed)
    },
    pickDice1(){
      if (this.attack.attackTerr.reserves > 2){
        const threeDice = this.attack.attackTerr.reserves > 3 ? true : false
        const dice = threeDice ? 3 : 2
        const title = this.currentPlayer.name + ", please pick number of dice to roll:"
        this.openPopup("dicepick1", 'small-center', title, '', (i) => this.pickDice2(i), {threeDice, dice})
      }
      else
        this.pickDice2(1)
    },
    pickDice2(redDice){
      if (redDice === 0)
        this.cancelAttack()
      else {
        if (this.attack.defendTerr.reserves > 1){
          const defender = this.getPlayerById(this.attack.defendTerr.owner)
          if (defender.settings.autoroll)
            this.attackResult(redDice, defender.settings.autoroll)
          else {
            if (!sounds.attack2.paused)
              sounds.attack2.currentTime = 0
            else if (!this.currentPlayer.isBot){
              sounds.attack2.play().catch((e) => {
                console.log(e)
                console.log("reloading attack2 sound")
                sounds.attack2.load()
              })
            }
            const title = defender.name + ", you are being attacked"
            const attackTerr = gameData.territoryInfo[this.attack.attackTerr.id].name
            const defendTerr = gameData.territoryInfo[this.attack.defendTerr.id].name
            const content = `${this.currentPlayer.name} is attacking ${defendTerr} from ${attackTerr}. Please pick number of dice to roll:`
            this.openPopup("dicepick2", 'small-center', title, content,
              (i) => this.attackResult(redDice, i), {threeDice: false, dice: 2, id: this.attack.defendTerr.owner})
          }
        }
        else
          this.attackResult(redDice, 1)
      }
    },
    attackResult(redDice, whiteDice){
      let losses = gameData.runAttack(redDice, whiteDice, this.game.settings.defenseWinsTie)
      Object.assign(losses, losses, this.attack)
      const redLose = losses.redLose != 1 ? losses.redLose+" troops" : losses.redLose+" troop"
      const whiteLose = losses.whiteLose != 1 ? losses.whiteLose+" troops" : losses.whiteLose+" troop"
      const content = this.currentPlayer.name + ", you lost "+redLose+". "+this.getPlayerById(this.attack.defendTerr.owner).name+" lost "+whiteLose+"."
      sounds.playAttack3()
      this.$store.dispatch("attack", losses).then((conquered) => {
        if (this.currentPlayer.isBot){
          if (conquered){
            setTimeout(() => this.moveTroops(this.game.territories[losses.attackTerr.id-1].reserves-1), this.aiSpeed/2)
          }
          else {
            this.closeAttack()
            this.aiTrigger++
          }
        }
        else {
          if (conquered)
            this.openPopup('callback', 'small-center', content, '', () => this.conquerTerritory(losses.attackTerr.id, redDice))
          else
            this.openPopup('callback', 'small-center', content, '', () => this.closeAttack())
        }
      })
    },
    cancelAttack(){
      this.closePopup()
      this.setAttackLine(0)
      this.$store.commit('setPhase', 'attack1')
      $(".selected").removeClass('selected')
      this.attack = {}
    },
    closeAttack(){
      this.closePopup()
      this.$store.commit('setPhase', 'attack1')
      $(".selected").removeClass('selected')
    },
    conquerTerritory(id, dice){
      const reserves = this.game.territories[id-1].reserves
      if (dice === reserves-1){
        this.moveTroops(reserves-1)
      }
      else {
        this.openPopup("passTroops", "small-center", "Territory Conquered!", '',
        (i) => this.moveTroops(i), {min: dice, max: reserves-1})
      }
    },
    moveTroops(i){
      this.closeAttack()
      sounds.conquer.play().catch((e) => {
        console.log(e)
            console.log("reloading conquer sound")
            sounds.conquer.load()
          })
      const data = {passingTerr: this.attack.attackTerr.id-1, recievingTerr: this.attack.defendTerr.id-1, troops: i}
      this.$store.commit("passTroops", data)
      this.$store.dispatch("checkForEliminatedPlayers").then((data) => {
        if (data[0]){
          const name = this.currentPlayer.isBot ? this.currentPlayer.name : "You"
          const action = this.game.phase === "gameOver" ? () => this.gameOver() : () => this.checkCards()
          this.openPopup("callback", "small-center", name+" just eliminated "+data[1]+".", '', action)
        }
        else if (this.currentPlayer.isBot){
          this.aiTrigger--
        }
      })
    },
    gameOver(){
      sounds.playGameOver()
      this.openPopup("alert", "small-center", this.game.players[0].name+", you just won the game!")
    },
    repeatAttack(){
      if (Object.keys(this.attack).length === 0)
        return
      else if (this.attack.attackTerr.reserves > 1 &&
        this.attack.attackTerr.owner === this.currentPlayer.id &&
        this.attack.defendTerr.owner != this.currentPlayer.id){
        sounds.attack2.play().catch((e) => {
          console.log(e)
          console.log("reloading attack2 sound")
          sounds.attack2.load()
        })
        $('.territory'+this.attack.attackTerr.id).addClass("selected")
        $('.territory'+this.attack.defendTerr.id).addClass("selected")
        this.pickDice1()
      }
    },

    // ========== End Turn/ Turn in Cards: ===============
    endTurnButton(){
      $("#endTurnButton").blur()
      if (['pass1', 'pass2'].includes(this.game.phase)){
        this.resetPassData()
        this.drawCard()
      }
      else {
        const content = this.currentPlayer.name+", do you want to pass troops before ending your turn?"
        this.openPopup("yesnocancel", "small", content, '', (i) => this.confirmPassing(i))
      }
    },
    confirmPassing(pass){
      if (pass)
        this.passingInfo()
      else
        this.drawCard()
    },
    passingInfo(){
      const content = "<p>Click on a passing territory, then click on a territory to pass the troops to. Click End Turn when you are done.</p>"
      this.openPopup('info', 'small', "Rules for Passing Troops", content, '', 'passRules')
      this.attackLine = ''
      this.$store.commit('setPhase', 'pass1')
      $(".selected").removeClass("selected")
    },
    endTurn(){
      this.$store.dispatch('endTurn')
    },
    drawCard(){
      if (this.currentPlayer.getsCard){
        this.$store.commit("drawCard")
        this.showCards(true)
        if (!this.currentPlayer.isBot){
          sounds.viewCards.play().catch((e) => {
            console.log(e)
            console.log("reloading viewCards sound")
            sounds.viewCards.load()
          })
        }
      }
      else
        this.openPopup("callback", "small", "No card was drawn because no territories were taken!", '', () => this.endTurn())
    },
    computerEndTurn(){
      this.drawCard()
      this.endTurn()
    },
    checkCards(){
      if (this.currentPlayer.isBot){
        this.closePopup()
        this.aiTrigger--
      }
      else if (this.currentPlayer.mustTurnInCards){
        const content = this.currentPlayer.name+", you have "+this.currentPlayer.cards.length+" cards. You must turn in cards now."
        this.openPopup('callback', 'small', 'You must turn in cards', content, () => this.turnInCards())
      }
      else
        this.closePopup()
    },
    showCards(endTurn){
      let action = endTurn ? () => this.endTurn() : () => this.closePopup()
      let cards = this.currentPlayer.cards.map((val) => this.game.shuffledCards[val].number-1)
      this.openPopup('cards', '', this.currentPlayer.name+"\'s cards", '', action, {cards})
    },
    turnInCards(){
      if (this.game.canTurnInCards){
        if (this.game.setsTurnedIn < this.game.settings.numOfSets){
          let cards = this.currentPlayer.cards.map((val) => this.game.shuffledCards[val].number-1)
          if (gameData.checkSetOfCards(cards))
            this.openPopup('turnInCards', '', "Turn In Cards", '', () => this.closePopup(),
            {cards: cards, currentPlayer: this.currentPlayer})
            //(popup commits turn in cards directly, so when it is done all we need to do is close popup)
          else
            this.openPopup("alert", "small", "You do not have a set of cards to turn in!")
        }
        else
          this.openPopup('alert', 'small', 'Max number of sets already turned in!')
      }
      else
        console.error("attempt to turn in cards when it is not allowed")
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
        this.openPopup('yesno', 'small', 'Are you sure you want to close the game?', '', () => this.close())
    },
    endGame(save){
      if (save){
        if (this.game.id != null){
          this.saveGame(this.game.id)
          this.close()
        }
        else {
          this.openPopup('input', 'small', 'Save Game', "Please name your game:", (x, name) => {
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
        this.openPopup('input', 'small', 'Save Game', "Please name your game:", (x, name) => {
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
      if (id === undefined){
        let id = games.length > 0 ? games[games.length-1].id+1 : 0
        this.$store.commit('setId', id)
        games.push(this.game)
      }
      else {
        let gameId = games.findIndex((e) => e.id === id)
        if (gameId === -1)
          console.error("error in saving game with id", id)
        games[gameId] = this.game
      }
      localStorage.setItem('invasionGames', JSON.stringify(games))
    },

    //============== Passing Troops: =============
    cancelPassTroops(){
      this.resetPassData()
      const phase = this.currentPlayer.reserves > 0 ? "addTroops" : "attack1"
      this.$store.commit("setPhase", phase)
    },
    cancelThisPass(){
      $('.selected').removeClass('selected')
      this.closePopup()
      this.$store.commit("setPhase", "pass1")
    },
    resetPassData(){
      $('.selected').removeClass('selected')
      this.passData = {terrs: [], long: 0, short: 0, canCancel: true, passer: null, passie: null}
    },
    selectPasser(i){
      const owner = this.game.territories[i-1].owner
      if (owner === this.currentPlayer.id){
        $('.territory'+i).addClass("selected")
        const list = gameData.checkContinuity(this.game.territories, owner, i, [])
        this.passData.terrs = list
        this.passData.passer = i
        this.$store.commit("setPhase", 'pass2')
      }
      else
        this.openPopup('alert', 'small-center','That territory does not belong to you!')
    },
    selectPassie(i){
      const owner = this.game.territories[i-1].owner
      if (owner === this.currentPlayer.id){
        this.passData.passie = i
        if (gameData.canFight(this.passData.passer, i))
          if (this.passData.short < 2)
            this.passTroopsModal('short', i)
          else
            this.passTroopsModal('long', i)
        else if (this.passData.terrs.includes(i))
          if (this.passData.long < 1)
            this.passTroopsModal('long', i)
          else
            this.openPopup('alert', 'small-center','You have no long passes remaining!')
        else
          this.openPopup('alert', 'small-center','You cannot pass to that territory!')
      }
      else
        this.openPopup('alert', 'small-center','That territory does not belong to you!')
    },
    passTroopsModal(type, passie){
      $('.territory'+passie).addClass("selected")
      const reserves = this.game.territories[this.passData.passer-1].reserves
      this.openPopup("passTroops", "small-center", "Pass Troops", '',
          (i) => {return i > 0 ? this.passTroops(type, i) : this.cancelThisPass()}, {min: 1, max: reserves-1})
    },
    passTroops(type, troops){
      this.passData.canCancel = false
      this.passData[type]++
      const data = {passingTerr: this.passData.passer-1, recievingTerr: this.passData.passie-1, troops}
      this.$store.commit("passTroops", data)
      $('.selected').removeClass('selected')
      this.closePopup()
      if (this.passData.short + this.passData.long >= 3){
        this.resetPassData()
        this.drawCard()
      }
      else
        this.$store.commit("setPhase", "pass1")
    },

    // ======= Popups: ===========
    openPopup(type, size, title, content, action, data){
      this.popup = {show: true, type, size, title, content, action, data}
    },
    closePopup(){
      this.popup = {show: false}
    },
    showAllPlayers(){
      this.openPopup('players', 'small', 'Players Info', '', '', {players: this.game.players, cardValue: this.game.cardSetValue})
    },
    openAlert(content){
      this.alert = {show: true, content}
    },
    closeAlert(){
      this.alert.show = false
    },

    //====== Settings: ===========
    showPlayerSettings(){
      this.openPopup('settings', 'small', this.currentPlayer.name+"\'s settings", '', '',
        {currentPlayer: this.currentPlayer, id: this.currentPlayer.id})
    },
    changeAiSpeed(){
      this.openPopup('dicepick1', 'small', 'Select AI Speed', ["Fast", "Medium", "Slow"], (x) => {
        if (x){
          this.aiSpeed = x * 250
          this.closePopup()
        }
        else
          this.closePopup()
      }, {threeDice: true, dice: this.aiSpeed/250})
    }
  }
}
</script>

<style scoped>
  .game{
    position: absolute;
    padding-top: 88px;
  }
  .wrapper{
    background-color: #222;
    width: 1200px;
    height: 1316px;
  }
@media(min-width: 675px){
  .game{
    padding-top: 106px;
  }
}
@media(min-width: 760px){
  .game{
    padding-top: 102px;
  }
}
@media(min-width: 865px){
  .game{
    padding-top: 60px;
  }
}
</style>