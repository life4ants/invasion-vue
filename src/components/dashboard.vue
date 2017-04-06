<template>
  <div class="bg">
    <div class="dashboard">
      <h1>Welcome to Invasion!</h1>
      <p>This is a super cool game!</p>
      <button v-on:click='start' class="btn in-brown">Start New Game</button>
      <button v-on:click='skip' class="btn btn-success">Skip to game</button>
      <button v-on:click='test' class="btn btn-success">Push me and see</button>
    </div>
  </div>
</template>

<script>
import gameData from "./game_data.js"
export default {
  name: 'dashboard',
  // components: { territory},
  props: [
    'start', 'skip'
  ],
  data(){
    return {
      terrs: [
        {id: 1, reserves: 3, icon: 76},
        {id: 2, reserves: 4, icon: 74},
        {id: 3, reserves: 5, icon: 56},
      ]
    }
  },
  methods: {
    test(){
      console.log("works in here")
      gameData.test()
    }
  }
}
</script>

<style>

</style>