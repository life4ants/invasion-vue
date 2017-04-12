<template>
  <div class="dashboard">
    <h1>Welcome to Invasion!</h1>
    <p>This is a super cool game!</p>
    <button v-on:click='start' class="btn in-brown">Start New Game</button>
    <button v-on:click='skip' class="btn btn-success">Skip to Game</button>
    <button v-on:click='openModal' class="btn btn-success">modal</button>
    <modal :showModal="modalopen" :foo="foo" containerClass="modal-wrapper">
      <h4 slot="body">body text</h4>
      <button slot="footer" @click="foo" class="btn btn-success">click me</button>
    </modal>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
</template>

<script>
import gameData from "./game_data.js"
import modal from 'modal-vue'

export default {
  name: 'dashboard',
  components: {
    modal
  },
  props: [
    'start', 'skip'
  ],
  data(){
    return {
      modalopen: false
    }
  },
  methods:{
    openModal(){
      this.modalopen = true
    },
    foo(){
      console.log('foo')
      this.modalopen = false
    }
  }
}
</script>

<style >
.modal-wrapper{
  top: 50%;
  transform: translateY(-50%);
}
</style>