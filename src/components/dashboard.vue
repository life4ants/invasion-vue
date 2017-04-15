<template>
  <div class="dashboard">
    <div>
      <popup :show="popup.show" :close="closePopup" :action="popup.action" :size="popup.size"
           :type="popup.type" :title="popup.title" :content="popup.content"></popup>
    </div>
    <h1>Welcome to Invasion!</h1>
    <p>This is a super cool game!</p>
    <button v-on:click='skip' class="btn btn-success">Skip to game</button>
    <button v-on:click='start' class="btn in-brown">Start New Game</button>
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

export default {
  name: 'dashboard',
  components: { popup },
  props: [
    'start', 'skip', 'games', "startGame"
  ],
  data(){
    return {
      edit: false,
      popup: {show: false}
    }
  },
  methods: {
    editGames(){
      this.edit = true
    },
    closeEdit(){
      this.edit = false
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
      this.openPopup('alert', 'small', name+" was successfully deleted.")
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

</style>