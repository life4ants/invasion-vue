<template>
  <div class="dashboard">
    <h1>Welcome to Invasion!</h1>
    <p>This is a super cool game!</p>
    <button v-on:click='action' class="btn in-brown">{{content}}</button>
    <ol><li v-for='item in items'>{{item}}</li></ol>
    <div v-html='html'></div>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  data(){
    return {
      items: Array(10).fill("a bunch of text"),
      html: this.setHtml()
    }
  },
  props: [
    'action',
    'content'
  ],
  methods: {
    setHtml(){
      return "<p>this is a paragraph</p>"
    }
  }
}
</script>

<style>

</style>