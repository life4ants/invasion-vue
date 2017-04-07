<template>
  <nav>
    <div v-if="phase === 'welcome'" class="header-content">
      <p>Welcome to Invasion!</p>
    </div>
    <div v-else class="header-content">
      <div>
        <button class='btn btn-default' @click='action'>End Game</button><br>
        <button class='btn' @click='playersInfo'>Players Info</button>
      </div>
      <div>
        <strong>Current Player: </strong>{{player.name}}
      </div>
      <icon :code="player.code"></icon>
    </div>
  </nav>
</template>

<script>
import icon from './icon'

export default {
  name: 'header',
  components: {
    icon
  },
  props: [
    'phase', 'action', 'player', 'playersInfo'
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
    min-height: 75px;
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

  button {
    margin-right: 10px;
  }

  .header-content > div{
    margin-right: 10px;
  }

</style>
