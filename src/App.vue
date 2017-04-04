<template>
  <div id="app">
    <div v-if="phase === 'welcome'">
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
  background-color: #f84;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
}

.in-brown {
  background-color: #842;
}

 .dashboard{
    min-height: 100%;
    max-width: 500px;
    margin: 0px 30px;
    padding: 20px;
    background-color: #fa6;
    border: solid 20px;
    border-color: rgba(10,10,10,0.2) rgba(0,0,0,0.4);
  }
</style>
