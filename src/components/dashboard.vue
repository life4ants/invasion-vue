<template>
  <div class="dashboard">
    <div>
      <popup :show="popup.show" :close="closePopup" :action="popup.action" :size="popup.size"
           :type="popup.type" :title="popup.title" :content="popup.content"></popup>
      <alert :show="alert.show" placement="top-right" type="success" :dismissable="true"
            width="200px" :duration="1500" :close="closeAlert">{{alert.content}}</alert>
    </div>
    <h1>Welcome to Invasion!</h1>
    <p>Welcome Chingus! :) This is a game based on Risk. It is still in beta, you could say, but it is fully playable.</p>
    <p>Feel free to give feedback on anything - button colors, overall look, sound volume, anything!</p>
    Coming soon:
    <ul>
      <li>AI players</li>
      <li>Responsive for phones</li>
      <li>Game and Player settings</li>
    </ul><br><br>
    <button @click='start' class="btn in-brown">Start New Game</button>
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
      this.openPopup('yesno', 'small', content, '', () => this.deleteGame(id))
    },
    renameGame(id){
      this.openPopup('input', '', 'Rename Game', "Please enter a new name for the game "+this.games[id].name+":", (x, name) => {
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