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
      const game = {"version":4,"id":1,"name":"3player","nextCard":0,"canTurnInCards":true,"cardSetValue":4,"gameOver":false,"players":[{"name":"Red","code":2,"terrCount":30,"cards":[],"getsCard":false,"mustTurnInCards":false,"reserves":7,"tempReserves":0},{"name":"Blue","code":16,"terrCount":30,"cards":[],"getsCard":false,"mustTurnInCards":false,"reserves":0,"tempReserves":0},{"name":"Green","code":24,"terrCount":30,"cards":[],"getsCard":false,"mustTurnInCards":false,"reserves":0,"tempReserves":0}],"phase":"addTroops","round":1,"shuffledCards":[{"case":1,"name":"New Brunswick","number":14},{"case":1,"name":"Baja California","number":56},{"case":1,"name":"Jamaica","number":86},{"case":0,"name":"Alaska","number":1},{"case":2,"name":"Saskatchewan","number":6},{"case":0,"name":"North Carolina","number":28},{"case":2,"name":"Nayarit","number":63},{"case":0,"name":"Colorado","number":46},{"case":2,"name":"Maine","number":15},{"case":1,"name":"Yucatan","number":77},{"case":2,"name":"Quintana Roo","number":78},{"case":1,"name":"West Virginia","number":20},{"case":0,"name":"Tamaulipas","number":67},{"case":1,"name":"Jalisco","number":71},{"case":1,"name":"Alberta","number":5},{"case":3,"name":"Wild","number":93},{"case":0,"name":"Nunavut","number":7},{"case":2,"name":"Tennessee","number":27},{"case":2,"name":"Chiapas","number":75},{"case":2,"name":"Missouri","number":36},{"case":0,"name":"Panama","number":85},{"case":0,"name":"Iowa","number":37},{"case":2,"name":"Nuevo Leon","number":66},{"case":2,"name":"Utah","number":54},{"case":1,"name":"Nicaragua","number":83},{"case":1,"name":"Haiti","number":89},{"case":0,"name":"Zacatecas","number":64},{"case":1,"name":"Nevada","number":53},{"case":1,"name":"Durango","number":62},{"case":0,"name":"Baja Calif. de Sur","number":58},{"case":1,"name":"Alabama","number":32},{"case":0,"name":"Quebec","number":10},{"case":0,"name":"Northwest Territories","number":4},{"case":2,"name":"North Dakota","number":39},{"case":2,"name":"Michigan","number":24},{"case":2,"name":"Costa Rica","number":84},{"case":3,"name":"Wild","number":94},{"case":1,"name":"Indiana","number":23},{"case":1,"name":"San Luis Potosi","number":65},{"case":0,"name":"Florida","number":31},{"case":0,"name":"Massachusetts","number":16},{"case":1,"name":"Washington","number":50},{"case":0,"name":"Belize","number":79},{"case":2,"name":"Michoacan","number":72},{"case":1,"name":"Texas","number":44},{"case":3,"name":"Wild","number":92},{"case":1,"name":"Oaxaca","number":74},{"case":1,"name":"Guatemala","number":80},{"case":1,"name":"Minnesota","number":38},{"case":1,"name":"Arkansas","number":35},{"case":0,"name":"California","number":52},{"case":0,"name":"Kentucy","number":22},{"case":1,"name":"Labrador","number":11},{"case":1,"name":"Veracruz","number":68},{"case":2,"name":"Newfoundland","number":12},{"case":0,"name":"Bahamas","number":88},{"case":1,"name":"South Carolina","number":29},{"case":0,"name":"Guanajuato","number":70},{"case":0,"name":"Arizona","number":55},{"case":0,"name":"Wisconsin","number":25},{"case":2,"name":"Ontario","number":9},{"case":0,"name":"Virginia","number":19},{"case":3,"name":"Wild","number":91},{"case":2,"name":"Sonora","number":57},{"case":0,"name":"Campeche","number":76},{"case":1,"name":"Illinois","number":26},{"case":2,"name":"Cuba","number":87},{"case":2,"name":"Kansas","number":42},{"case":2,"name":"Oregon","number":51},{"case":0,"name":"South Dakota","number":40},{"case":2,"name":"Pennsylvania","number":18},{"case":2,"name":"New Mexico","number":45},{"case":1,"name":"Nebraska","number":41},{"case":1,"name":"New York","number":17},{"case":0,"name":"Nova Scotia","number":13},{"case":0,"name":"Honduras","number":82},{"case":1,"name":"Wyoming","number":47},{"case":2,"name":"Georgia","number":30},{"case":2,"name":"Ohio","number":21},{"case":0,"name":"Coahuila","number":61},{"case":2,"name":"Montana","number":48},{"case":2,"name":"Mississippi","number":33},{"case":2,"name":"British Columbia","number":3},{"case":0,"name":"Louisiana","number":34},{"case":0,"name":"Idaho","number":49},{"case":2,"name":"Chihuahua","number":60},{"case":1,"name":"Yukon Territory","number":2},{"case":2,"name":"El Salvador","number":81},{"case":0,"name":"Oklahoma","number":43},{"case":0,"name":"Guerrero","number":73},{"case":2,"name":"Puebla","number":69},{"case":2,"name":"Dominican Republic","number":90},{"case":1,"name":"Sinaloa","number":59},{"case":1,"name":"Manitoba","number":8}],"territories":[{"id":1,"reserves":1,"owner":2},{"id":2,"reserves":1,"owner":1},{"id":3,"reserves":1,"owner":0},{"id":4,"reserves":7,"owner":2},{"id":5,"reserves":1,"owner":1},{"id":6,"reserves":1,"owner":0},{"id":7,"reserves":1,"owner":0},{"id":8,"reserves":1,"owner":2},{"id":9,"reserves":4,"owner":0},{"id":10,"reserves":9,"owner":1},{"id":11,"reserves":1,"owner":0},{"id":12,"reserves":1,"owner":2},{"id":13,"reserves":1,"owner":0},{"id":14,"reserves":1,"owner":0},{"id":15,"reserves":1,"owner":0},{"id":16,"reserves":1,"owner":1},{"id":17,"reserves":1,"owner":0},{"id":18,"reserves":1,"owner":1},{"id":19,"reserves":1,"owner":1},{"id":20,"reserves":7,"owner":2},{"id":21,"reserves":1,"owner":1},{"id":22,"reserves":1,"owner":0},{"id":23,"reserves":1,"owner":0},{"id":24,"reserves":1,"owner":1},{"id":25,"reserves":1,"owner":1},{"id":26,"reserves":1,"owner":0},{"id":27,"reserves":1,"owner":1},{"id":28,"reserves":1,"owner":2},{"id":29,"reserves":1,"owner":2},{"id":30,"reserves":10,"owner":0},{"id":31,"reserves":1,"owner":0},{"id":32,"reserves":1,"owner":2},{"id":33,"reserves":1,"owner":2},{"id":34,"reserves":1,"owner":0},{"id":35,"reserves":1,"owner":1},{"id":36,"reserves":1,"owner":2},{"id":37,"reserves":1,"owner":0},{"id":38,"reserves":1,"owner":0},{"id":39,"reserves":1,"owner":1},{"id":40,"reserves":1,"owner":2},{"id":41,"reserves":1,"owner":2},{"id":42,"reserves":1,"owner":1},{"id":43,"reserves":1,"owner":0},{"id":44,"reserves":1,"owner":1},{"id":45,"reserves":1,"owner":1},{"id":46,"reserves":1,"owner":2},{"id":47,"reserves":1,"owner":2},{"id":48,"reserves":1,"owner":2},{"id":49,"reserves":1,"owner":2},{"id":50,"reserves":1,"owner":1},{"id":51,"reserves":1,"owner":1},{"id":52,"reserves":1,"owner":2},{"id":53,"reserves":1,"owner":2},{"id":54,"reserves":1,"owner":0},{"id":55,"reserves":1,"owner":1},{"id":56,"reserves":1,"owner":2},{"id":57,"reserves":1,"owner":0},{"id":58,"reserves":1,"owner":2},{"id":59,"reserves":1,"owner":1},{"id":60,"reserves":1,"owner":2},{"id":61,"reserves":1,"owner":2},{"id":62,"reserves":1,"owner":1},{"id":63,"reserves":1,"owner":0},{"id":64,"reserves":1,"owner":1},{"id":65,"reserves":1,"owner":1},{"id":66,"reserves":1,"owner":1},{"id":67,"reserves":1,"owner":2},{"id":68,"reserves":1,"owner":1},{"id":69,"reserves":1,"owner":1},{"id":70,"reserves":1,"owner":0},{"id":71,"reserves":1,"owner":1},{"id":72,"reserves":1,"owner":1},{"id":73,"reserves":1,"owner":0},{"id":74,"reserves":1,"owner":0},{"id":75,"reserves":1,"owner":2},{"id":76,"reserves":1,"owner":2},{"id":77,"reserves":1,"owner":0},{"id":78,"reserves":1,"owner":1},{"id":79,"reserves":1,"owner":0},{"id":80,"reserves":1,"owner":2},{"id":81,"reserves":1,"owner":2},{"id":82,"reserves":1,"owner":0},{"id":83,"reserves":1,"owner":0},{"id":84,"reserves":1,"owner":2},{"id":85,"reserves":1,"owner":1},{"id":86,"reserves":1,"owner":0},{"id":87,"reserves":1,"owner":2},{"id":88,"reserves":1,"owner":0},{"id":89,"reserves":1,"owner":2},{"id":90,"reserves":5,"owner":1}],"turnIndex":0,"turnMessage":{"type":"Trps","data":{"countryPoints":7,"conPoints":0,"messages":[]}}}
      this.$store.commit('loadGame', game)
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
    font-family: 'Roboto', sans-serif;
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
