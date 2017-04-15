<template>
  <nav>
    <div class="header-content">
      <div class="round-counter">
        <span id="tiny">Round</span>
        {{round}}
      </div>
      <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Menu
        <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <li><a class='btn-default' @click="endGame">Exit Game</a></li>
          <li><a class='btn-default' @click="saveGame">Save Game</a></li>
          <li><a class='btn-default' @click="playersInfo">Players Info</a></li>
        </ul>
      </div>
      <div>
        <button class="btn btn-success" @click="endTurn">End Turn</button>
      </div>
      <ul class="info">
        <li><strong>Current Player: </strong>{{player.name}}<icon :code="player.code" :size="18"></icon></li>
        <li><strong>Territories: </strong>{{player.terrCount}}</li>
        <li v-if="phase === 'initialTroops'"><strong>Total Reserves: </strong>{{player.reserves}}</li>
        <li><strong>Reserves: </strong>{{player.tempReserves}}</li>
        <li v-if="phase === 'attack3'">attack line goes here</li>
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
    'phase', 'endGame', 'saveGame', 'player', 'playersInfo', 'endTurn', 'alert', 'round'
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
    min-height: 60px;
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

  .info {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
    columns: 2;
  }

  #tiny{
    font-size: 10px;
  }

  .round-counter{
    border-radius: 40%;
    border: 3px solid #740;
    font-size: 25px;
    height: 47px;
    width: 45px;
    line-height: 17px;
    padding: 2px;
    font-weight: 500;
  }

  .header-content > div{
    margin-right: 10px;
  }

  .info span{
    position: relative;
    top: 3px;
    margin-left: 4px;
  }

</style>
