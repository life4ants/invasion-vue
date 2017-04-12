<template>
  <nav>
    <div class="header-content">
      <div>
        <span>{{phase}}</span><br>
        <button class='btn' @click='alert'>Alert</button><br>
        <button class='btn' @click='playersInfo'>Players Info</button><br>
      </div>
      <div>
        <button class='btn btn-default' @click='action'>End Game</button><br>
        <button class='btn btn-warning' @click='endTurn'>End Turn</button>
      </div>
      <ul>
        <li><strong>Current Player: </strong>{{player.name}}<icon :code="player.code" :size="18"></icon></li>
        <li><strong>Territories: </strong>{{player.terrCount}}</li>
        <li><strong>Reserves: </strong>{{player.tempReserves}}</li>
        <li><strong>Total Reserves: </strong>{{player.reserves}}</li>
      </ul>
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
    'phase', 'action', 'player', 'playersInfo', 'endTurn', 'alert'
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
    min-height: 100px;
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

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  button {
    margin-right: 10px;
  }

  .header-content > div{
    margin-right: 10px;
  }

  span{
    position: relative;
    top: 5px;
    margin-left: 4px;
  }

</style>
