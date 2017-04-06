<template>
  <div class="overlay">
    <territory v-for="terr in territories" :id="terr.id" :reserves="terr.reserves" :icon="terr.owner"></territory>
  </div>
</template>

<script>
  import territory from './territory'

  export default {
    name: 'board',
    components: { territory },
    props: {
      territories: { type: Array }
    }
  }
</script>

<style scoped>
.overlay{
  position: absolute;
  pointer-events: none;
}

</style>