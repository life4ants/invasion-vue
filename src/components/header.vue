<template>
  <nav>
    <div v-if="phase === 'welcome'" class="header-content">
      <p>Welcome to Invasion!</p>
    </div>
    <div v-else class="header-content">
      <p>We must be playing!</p>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'header',
  props: [
    'phase'
  ]
}
</script>

<style scoped>

  nav {
    background-color: #058005;
    position: fixed;
    border-bottom: 3px solid #444;
    top: 0px;
    left: 0px;
    width: 100vw;
    min-height: 40px;
    padding: 5px;
    font-size: 16px;
    z-index: 5;
  }
  .header-content{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .green{
    height: 15px;
    width: 200px;
    background-color: #18b84a;
  }

</style>
