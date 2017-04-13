<template>
  <footer>
    <strong>Current Phase: </strong>
        {{phase}}
  </footer>
</template>

<script>

  export default {
    name: 'footer',
    props: [
      'phase'
    ]
  }
</script>

<style>
  footer{
   position: fixed;
   bottom: 0px;
   left: 0px;
   border-style: solid;
   border-color: #363;
   border-width: 2px 2px 0px 0px;
   padding: 3px 5px;
   border-radius: 0pt 10px 0pt 0px;
   background: rgba(110, 256, 110, 0.9);
   color: #344;
   font-size: 16px;
  }
</style>