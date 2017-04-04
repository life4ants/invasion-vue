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
      <icon v-bind:code="playerCode" :size=40></icon>
      <iconbox v-bind:code="playerCode" :changeIcon='changeIcon'></iconbox>
      <div>
        <h4>Player {{player+1}}</h4>
        <label>Name:</label>
        <input v-model='players[player].name'><br>
        <label>code:</label>
        <input v-model='players[player].code'>
      </div>
    </div>
    <button v-if="step > 1" v-on:click='lastStep' class="btn"> << Last Step</button>
    <button v-if='player < numOfPlayers-1' v-on:click='nextStep' class="btn">Next Step >></button>
    <button v-if='player === numOfPlayers-1' v-on:click='startGame' class="btn">Finish</button>
  </div>
</template>

<script>
import iconbox from './iconbox'
import icon from './icon'

export default {
  name: 'setup',
  components: {
    iconbox, icon
  },
  data(){
    return {
      step: 1,
      player: 0,
      playerCode: 0,
      players: [{name: '', code: 0}],
      numOfPlayers: 2
    }
  },
  methods: {
    changeIcon(i){
      let players = this.players
      players[this.player].code = i
      this.players = players
    },
    nextStep(){
      if (this.step === 1){
        for (let i=0; i<this.numOfPlayers; i++){
          this.players[i] = {name: '', code: 0}
        }
        this.step++
        this.playercode = this.players[this.player].code
      }
      else
        this.player++
    },
    lastStep(){
      if (this.player > 0)
        this.player--
      else
        this.step--
    },
    startGame(){

    }
  },
  computed: {
    // playercode(){
    //   return this.players[this.player].code
    // }
  }
}
</script>

<style scoped>
  ol {
    list-style: none;
    padding: 0;
  }
</style>
