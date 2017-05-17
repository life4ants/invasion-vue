<template>
  <div class="dashboard">
    <div>
      <popup :show="popup.show" :closePopup="closePopup" :action="popup.action" :size="popup.size"
           :type="popup.type" :title="popup.title" :content="popup.content"></popup>
      <alert :show="alert.show" placement="top-right" type="success" :dismissable="true"
            width="200px" :duration="1500" :close="closeAlert">{{alert.content}}</alert>
    </div>
    <h1>Welcome to Invasion!</h1>
    <p>
      This is a game based on Risk®. If you know how to play Risk, you should have no problem with this game. If not, here are a few pointers:
    </p>
    <p>
    The map is divided into 90 territories, in 9 regions. Each region is a different color, and has a different score, indicated by the number in the round badge. The goal of the game is to conquer every territory on the map. You will be given troops at the beginning of the game to defend your position. Decide which regions you have the best chance of conquering, and add your troops there.
    </p>
    <p>
      At the beginning of each turn you will also recive troops, based on how many territories and regions you have. At the end of each turn you will recieve a card if you conquered at least one territory on that turn. Cards can be turned in at the beginning of the turn, or after eliminating another player. The number of troops for a set of cards starts at 4, and goes up every time a set is turned in. When you eliminate a player, you get all his cards.
    </p>
    <p>Hint: pressing the "R" key will repeat the last attack you made.</p>
    <button @click='start' class="btn btn-primary">Start New Game</button>
    <h3>Saved Games:</h3>
    <ul v-if="edit">
      <li v-for="(game, id) in games">
        <button class="btn btn-default btn-lg stretch">
          {{game.name}}
          <span>
            <a @click="renameGame(id)">rename</a>
            <a @click="confirmDelete(id)">delete</a>
          </span>
        </button>
      </li>
    </ul>
    <ul v-else id="col">
      <li v-for="(game, id) in games">
        <button class="btn btn-default btn-lg" @click="startGame(id)">{{game.name}}</button>
      </li>
    </ul>
    <div v-if="games.length === 0"><i>No games yet</i></div>
    <div v-else-if="edit" ><a @click="closeEdit">Done</a></div>
    <div v-else ><a @click="editGames">Edit games</a></div>
  </div>
</template>

<script>
import popup from './popup'
import alert from './Alert'

export default {
  name: 'dashboard',
  components: { popup, alert },
  props: [
    'start', 'games', "startGame"
  ],
  data(){
    return {
      edit: false,
      popup: {show: false},
      alert: {show: false}
    }
  },
  methods: {
    editGames(){
      this.edit = true
    },
    closeEdit(){
      this.edit = false
    },
    openAlert(content){
      this.alert = {show: true, content}
    },
    closeAlert(){
      this.alert.show = false
    },
    openPopup(type, size, title, content, action){
      this.popup = {show: true, type, size, title, content, action}
    },
    closePopup(){
      this.popup = {show: false}
    },
    confirmDelete(id){
      const content = "Are you sure you want to delete "+this.games[id].name + " ?"
      this.openPopup('yesno', 'small-center', content, '', () => this.deleteGame(id))
    },
    renameGame(id){
      this.openPopup('input', 'small-center', 'Rename \"'+this.games[id].name+'\"', "Please enter a new name:", (x, name) => {
            if (x){
              this.games[id].name = name
              localStorage.setItem('invasionGames', JSON.stringify(this.games))
              this.closePopup()
            }
            else
              this.closePopup()
          })
    },
    deleteGame(id){
      const name = this.games[id].name
      this.games.splice(id, 1)
      localStorage.setItem('invasionGames', JSON.stringify(this.games))
      this.closePopup()
      this.openAlert(name+" was successfully deleted.")
    }
  }
}
</script>

<style scoped>
  .stretch{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ul button{
    width: 100%;
  }

  @media(min-width: 450px){
    #col{
      columns: 2;
    }
  }
  p {
    text-align: left;
  }

</style>