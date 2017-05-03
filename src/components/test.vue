<template>
  <div class="test">
  <button @click="play">play</button>
  </div>
</template>

<script>
// import troops1 from "../assets/troops1.mp3"
  export default {
    name: 'test',
    data(){
      return {
        volume: 30,
        attacksound: new Audio("http://www.andrewdbuck.com/invasion/pics/troops1.mp3")
      }
    },
    mounted(){
      // let url = require("../assets/troops1.mp3")
      // this.attacksound.src =
    },
    methods: {
      play(){
        if (this.attacksound.paused)
          this.attacksound.play()
        else
          this.attacksound.currentTime = 0
      }
    }
  }
</script>

<style>

</style>