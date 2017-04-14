<template>
  <div class="bg">
    <div class="dashboard">
      <h1>Welcome to Invasion!</h1>
      <p>This is a super cool game!</p>
      <button v-on:click='skip' class="btn btn-success">Skip to game</button>
      <button v-on:click='start' class="btn in-brown">Start New Game</button>
      <ul>
        <li v-for="(game, id) in games" @click="startGame(id)">{{game.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  props: [
    'start', 'skip', 'games', "startGame"
  ],
}
</script>

<style>

</style>