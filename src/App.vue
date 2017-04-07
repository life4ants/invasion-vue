<template>
  <div id="app">
    <dashboard v-if="phase === 'welcome'" :start='start' :skip="skip" content='start game'></dashboard>
    <game v-else :close='cancel' :initial="gamephase"></game>
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
      phase: 'welcome',
      gamephase: 'setup'
    }
  },

  methods: {
    start(){
      this.phase = 'playing'
    },
    skip(){
      this.gamephase = 'playing'
      this.phase = 'playing'
    },
    cancel(){
      this.phase = 'welcome'
      this.gamephase = 'setup'
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
    user-select: none;
    color: #2c3e50;
  }

  .bg{
    position: fixed;
    background-color: #f84;
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .flex-bg{
    display: flex;
    justify-content: center;
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

  @media(min-width: 620px){
    .dashboard{
      margin: auto;
    }
  }
</style>
