<template>
  <div id="app">
    <div class="flex-wrapper" v-if="phase === 'welcome'">
      <dashboard :action='start' content='start game'></dashboard>
    </div>
    <div v-else>
      <game :close='cancel'></game>
    </div>
  </div>
</template>

<script>
import dashboard from './components/dashboard'
import game from './components/game'
import 'bootstrap/dist/css/bootstrap.css';

export default {
  name: 'app',
  components: {
    dashboard,
    game
  },

  data(){
    return {
      phase: 'welcome'
    }
  },

  methods: {
    start(){
      this.phase = 'playing'
    },
    cancel(){
      this.phase = 'welcome'
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .flex-wrapper{
    display: flex;
    justify-content: center;
    background-color: #f84;
  }

  .in-brown {
    background-color: #842;
  }

  .flex{
    display: flex;
  }

 .dashboard{
    min-height: 100%;
    max-width: 580px;
    margin: 0px 20px;
    padding: 20px;
    background-color: #fa6;
    border: solid 20px;
    border-color: rgba(10,10,10,0.2) rgba(0,0,0,0.4);
  }
</style>
