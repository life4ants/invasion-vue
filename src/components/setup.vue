<template>
  <div class="dashboard">
    <h3>Start New Game</h3>
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
    <p>{{numOfPlayers}} people will be playing!</p>
    <ol>
      <li v-for="(player, index) in players">
        <h4>Player {{index+1}}</h4>
        <label>Name:</label>
        <input v-model='player.name'><br>
        <label>code:</label>
        <input v-model='player.code'>
      </li>
    </ol>
  </div>
</template>

<script>

export default {
  name: 'setup',
  components: {

  },
  data(){
    return {
      items: [],
      numOfPlayers: 2
    }
  },
  computed: {
    players: function(){
      var _players = []
      for (let i=0; i<this.numOfPlayers; i++){
        _players.push({name: '', code: null})
      }
      return _players
    }
  }
}
</script>

<style scoped>
  ol {
    list-style: none;
  }
</style>
