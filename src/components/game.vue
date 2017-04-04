<template>
  <setup v-if="phase === 'setup'"></setup>
  <div v-else class="game">
    Hello this is the game
  </div>
</template>

<script>
import setup from './setup'

export default {
  name: 'game',
  components: {
    setup
  },
  props: [
    'close'
  ],
  data(){
    return {
      phase: 'setup'
    }
  }
}
</script>

<style >

</style>