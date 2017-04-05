<template>
  <div class="dashboard">
    <h1>Welcome to Invasion!</h1>
    <p>This is a super cool game!</p>
    <button v-on:click='action' class="btn in-brown">{{content}}</button>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  props: [
    'action',
    'content'
  ]
}
</script>

<style>

</style>