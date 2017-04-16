<template>
  <div id="app">
    <div :class="{bg: true, fixed: phase != 'playing' }">
      <dashboard v-if="phase === 'welcome'" :start='newGame' :skip="makeGame" :games="games" :startGame="loadGame"></dashboard>
      <setup v-else-if="phase === 'setup'" :cancel='cancel' :start="startGame"></setup>
      <game v-else :close='cancel'></game>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import dashboard from './components/dashboard'
import game from './components/game'
import setup from './components/setup'

localStorage.invasionGames = localStorage.invasionGames || JSON.stringify([])

export default {
  name: 'app',
  components: {
    dashboard,
    setup,
    game
  },

  data(){
    return {
      phase: 'welcome',
      games: JSON.parse(localStorage.invasionGames)
    }
  },

  methods: {
    newGame(){
      this.phase = 'setup'
    },
    startGame(){
      this.phase = 'playing'
    },
    loadGame(id){
      this.$store.commit('loadGame', this.games[id])
      this.phase = 'playing'
    },
    makeGame(){
      const players = [{code:22,name:"Fred",terrCount:26},
              {code:53,name:"Bill",terrCount:7},
              {code:15,name:"Roslyn",terrCount:22},
              {code:41,name:"Maria",terrCount:12},
              {code:36,name:"Kyle",terrCount:11},
              {code:8,name:"Edward",terrCount:7},
              {code:17,name:"Joseph",terrCount:5}]
      this.$store.commit('createGame', players)
      this.phase = 'playing'
    },
    cancel(){
      this.phase = 'welcome'
      this.games = JSON.parse(localStorage.invasionGames)
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
    background-color: #f84;
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .fixed{
    position: fixed;
  }

  .in-brown {
    background-color: #842;
  }

  .flex{
    display: flex;
  }

 .dashboard{
    flex: 0 1 580px;
    min-height: 100%;
    max-width: 580px;
    margin: 0px 20px;
    padding: 20px;
    background-color: #fa6;
    border: solid 20px;
    border-color: rgba(10,10,10,0.2) rgba(0,0,0,0.4);
  }

  .indent{
    text-indent: 20px;
  }

  .modal-content{
    text-align: left;
  }

  @media(min-width:768px) {

  #popup .modal-dialog{
    width: 400px;
  }

  #popup-center .modal-dialog{
    width: 400px;
    top: 50%;
    margin: 0x auto;
    transform: translateY(-50%);
  }
}
  @media only screen and (max-device-width: 600px){
    .bg{
      position: fixed;
    }
  }


  @media(min-width: 620px){
    .dashboard{
      margin: auto;
    }
  }
  @media(min-width: 1200px){
    .bg{
      display: flex;
      justify-content: center;
    }
  }
</style>
