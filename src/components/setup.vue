<template>
  <div class="dashboard">
    <h3>Start New Game</h3>
    <!-- step one: -->
    <div v-if="step === 1">
      <label>Select Number of Players:</label>
      <select v-model='numOfPlayers'>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        <option value=6>6</option>
        <option value=7>7</option>
        <option value=8>8</option>
      </select><br><br>
      <label>Use tiebreaking:</label>
      <span class="line">
        <label for="TBtrue">Yes</label>
        <input type="radio" :value="true" id="TBtrue" v-model="tieBreaker">
        <label for="TBfalse">No</label>
        <input type="radio" :value="false" id="TBfalse" v-model="tieBreaker">
      </span><br>
      <a href="#" @click="showTiebreaker">{{tiebreakerShown ? "hide details" : "show details" }}</a><br>
      <p v-if="tiebreakerShown">
        Tie breaker will help prevent any advantage in case of a tied dice roll.<br>
        If set to "No," the defense will always win a tie. This means if offense and defense both roll two of the same number, offense will lose 2 troops. <br>
        If set to "Yes," the above scenario will result in each player losing one troop, and in the case of one tie, the defense will lose every other time and the offense will lose every other time.
      </p>
      <br v-else>
      <label>Allow card stockpiling:</label>
      <span class="line">
        <label for="HChigh">High</label>
        <input type="radio" value="high" id="HChigh" v-model="holdCards">
        <label for="HCmid">Medium</label>
        <input type="radio" value="mid" id="HCmid" v-model="holdCards">
        <label for="HClow">Low</label>
        <input type="radio" value="low" id="HClow" v-model="holdCards">
      </span><br>
      <a href="#" @click="showHoldCards">{{holdCardsShown ? "hide details" : "show details" }}</a><br>
      <p v-if="holdCardsShown">
        This describes the maximum number of cards a player can have before they must turn in cards and how many sets of cards a player may turn in at one time.
        <ul>
          <li>High: 11 cards max, three sets at a time</li>
          <li>Medium: 8 cards max, two sets at a time</li>
          <li>Low: 5 cards max, one set at a time</li>
        </ul>
      </p>
      <br v-else>
    </div>
    <!-- Step two:  -->
    <div v-if="step === 2">
      <div>
        <h4>Player {{currentPlayer+1}}</h4>
        <label>Human</label>
        <input type="radio" :value="false" v-model="isBot">
        <label>AI</label>
        <input type="radio" :value="true" v-model="isBot">
        <label>Name:</label>
        <input v-model='players[currentPlayer].name' maxlength="22"><br>
        <i>{{error}}</i>
        <iconbox v-if="isBot" :double="false" :code="filteredCode" :changeIcon='changeIcon'></iconbox>
        <iconbox v-else :double="true" :code="filteredCode" :changeIcon='changeIcon'></iconbox>
        <div class="icon">
          <icon :code="code" :size=40></icon>
        </div>
      </div>
    </div>
    <div v-if="step === 3">
      <p>Here are the players, listed in the order they will play in the game. However, depending on how many players there are, initial troop distribution may be in a different order.</p>
      <ol>
        <li v-for="player in shuffledPlayers">
          <h4>{{player.name}}:</h4>
          <icon :code="player.code" ></icon>
        </li>
      </ol>
    </div>
    <button v-if='step === 1' class="btn" @click='cancel'>cancel</button>
    <button v-if="step > 1" v-on:click='lastStep' class="btn"> << Back</button>
    <button v-if='currentPlayer < numOfPlayers-1' v-on:click='nextStep' class="btn">Next >></button>
    <button v-if='currentPlayer === numOfPlayers-1' v-on:click='nextStep' class="btn">{{finishText}}</button>
  </div>
</template>

<script>
import iconbox from './iconbox'
import icon from './icon'
import GameData from './game_data.js'

export default {
  name: 'setup',
  components: {
    iconbox, icon
  },
  props: [
    'start', 'cancel'
  ],
  data(){
    return {
      step: 1,
      code: -1,
      isBot: false,
      currentPlayer: 0,
      players: [{name: '', code: -1}],
      shuffledPlayers: [],
      numOfPlayers: 2,
      tieBreaker: true,
      holdCards: "mid",
      tiebreakerShown: false,
      holdCardsShown: false,
      error: ''
    }
  },
  methods: {
    changeIcon(i){
      this.code = i
      if (!this.verifyIcon())
        this.error = "That icon is already taken!"
      else
        this.error = this.error === "Please enter a name" ? this.error : ''
    },
    showTiebreaker(){
      this.tiebreakerShown = !this.tiebreakerShown
    },
    showHoldCards(){
      this.holdCardsShown = !this.holdCardsShown
    },
    setSettings(){
      let sets, cards
      switch (this.holdCards){
        case 'high':
          sets = 3
          cards = 11
          break
        case 'mid':
          sets = 2
          cards = 8
          break
        case 'low':
          sets = 1
          cards = 5
      }
      return {numOfSets: sets, numOfCards: cards, defenseWinTie: !this.tieBreaker}
    },
    nextStep(){
      if (this.step === 1){
        this.players = []
        for (let i=0; i<this.numOfPlayers; i++){
          this.players[i] = {name: '', id: i, code: -1, terrCount: 0, cards: [], getsCard: false, isBot: false,
          mustTurnInCards: false, settings: {autoroll: false}} //change here needs to up version number
        }
        this.code = -1
        this.isBot = false
        this.step++
      }
      else if (this.step === 3){
        const settings = this.setSettings()
        this.$store.commit('createGame', {players: this.players, settings})
        this.start()
      }
      else {
        const verify = this.verify()
        if (verify === 'OK' && this.currentPlayer < this.numOfPlayers-1) {
          this.setData()
          this.currentPlayer++
          this.retriveData()
        }
        else if (verify === 'OK'){
          this.setData()
          const players = this.players
          this.shuffledPlayers = GameData.shuffle(players)
          this.step++
          this.error = ''
        }
        else
          this.error = verify
      }
    },
    lastStep(){
      if (this.currentPlayer > 0 && this.step === 2){
        this.setData()
        this.currentPlayer--
        this.retriveData()
      }
      else
        this.step--
    },
    retriveData(){
      this.code = this.players[this.currentPlayer].code
      this.isBot = this.players[this.currentPlayer].isBot
      this.error = ''
    },
    setData(){
      this.players[this.currentPlayer].code = this.code
      this.players[this.currentPlayer].isBot = this.isBot
    },
    verify(){
      this.players[this.currentPlayer].name = this.players[this.currentPlayer].name.replace(/^\s+|\s+$/g, '')
      if (this.players[this.currentPlayer].name.length < 1)
        return "Please enter a name"
      if (this.code < 0)
        return "Please pick an Icon"
      if (!this.verifyIcon())
        return "That icon is already taken!"
      return 'OK'
    },
    verifyIcon(){
      for (let i=0; i< this.players.length; i++){
        if (this.code === this.players[i].code && i != this.currentPlayer)
          return false
      }
      return true
    }
  },
  computed: {
    filteredCode(){
      return this.code >= 0 ? this.code : this.code+1
    },
    finishText(){
      return this.step === 3 ? 'Start Game' : 'Finish'
    }
  },
  watch: {
    isBot(){
      this.code = this.isBot ? 100 : -1
    }
  }
}
</script>

<style scoped>
  p{
    text-align: left;
  }
  .icon{
    height: 60px;
    margin: 10px;
    padding: 10px;
    border-top: 1px dashed;
    border-bottom: 1px dashed;
  }
  ol {
    list-style: none;
    padding: 0;
  }
  ol li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h4{
    margin-right: 20px;
  }

  label {
    margin: 0px 1px 0px 8px;
  }

  .line {
    display: inline-block;
  }
</style>
