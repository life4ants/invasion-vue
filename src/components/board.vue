<template>
  <div class="overlay">
    <territory v-for="terr in territories" :id="terr.id" :key="terr.id"
             :reserves="terr.reserves" :icon="codes[terr.owner]"></territory>
  </div>
</template>

<script>
  import territory from './territory'

  export default {
    name: 'board',
    components: { territory },
    props: {
      territories: { type: Array },
      players: {type: Array}
    },
    computed: {
      codes(){
        let output = {}
        for (let i=0; i<this.players.length; i++){
          output[this.players[i].id] = this.players[i].code
        }
        return output
      }
    }
  }
</script>

<style scoped>
.overlay{
  position: absolute;
  pointer-events: none;
}

</style>