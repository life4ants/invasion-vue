<template>
  <div class="dashboard">
    <h3>Start New Game</h3>
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
      </select>
    </div>
    <div v-if="step === 2">
      <div>
        <h4>Player {{currentPlayer+1}}</h4>
        <label>Name:</label>
        <input v-model='players[currentPlayer].name'><br>
        <i>{{error}}</i>
      </div>
      <iconbox :code="filteredCode" :changeIcon='changeIcon'></iconbox>
      <div class="icon">
        <icon :code="code" :size=40></icon>
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
      currentPlayer: 0,
      players: [{name: '', code: -1}],
      shuffledPlayers: [],
      numOfPlayers: 2,
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
    nextStep(){
      if (this.step === 1){
        this.players = []
        for (let i=0; i<this.numOfPlayers; i++){
          this.players[i] = {name: '', code: -1, terrCount: 0, cards: []} //change here needs to up version number
        }
        this.code = -1
        this.step++
      }
      else if (this.step === 3){
        this.$store.commit('createGame', this.players)
        this.start()
      }
      else {
        const verify = this.verify()
        if (verify === 'OK' && this.currentPlayer < this.numOfPlayers-1) {
          this.players[this.currentPlayer].code = this.code
          this.currentPlayer++
          this.error = ''
          this.code = this.players[this.currentPlayer].code
        }
        else if (verify === 'OK'){
          this.players[this.currentPlayer].code = this.code
          const players = this.players
          this.shuffledPlayers = GameData.shuffle(players.slice())
          this.step++
          this.error = ''
        }
        else
          this.error = verify
      }
    },
    lastStep(){
      if (this.currentPlayer > 0 && this.step === 2){
        this.players[this.currentPlayer].code = this.code
        this.currentPlayer--
        this.code = this.players[this.currentPlayer].code
        this.error = ''
      }
      else
        this.step--
    },
    verify(){
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
  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h4{
    margin-right: 20px;
  }
</style>
