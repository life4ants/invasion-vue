<template>
  <nav>
    <div class="header-content">
      <div class="header-buttons">
        <div class="musicIcon" v-if="musicOn">
          <span @click="setMusic">
            <i class="fa fa-music fa-lg"></i>
          </span>
          <input type="range" id="volumeSlider" v-model.number="volume">
        </div>
        <div v-else>
          <span class="fa-stack fa-lg" @click="setMusic">
            <i class="fa fa-music fa-stack-1x"></i>
            <i class="fa fa-ban fa-stack-2x"></i>
          </span>
        </div>
        <div class="round-counter">
          <span id="tiny">Round</span>
          {{round}}
        </div>
        <div v-if="['pass1', 'pass2'].includes(phase) && canCancel">
          <button class="btn btn-default line" @click="menu('CPT')">Cancel<br>Passing</button>
        </div>
        <div v-else class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Menu
          <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li><a class='btn-default' @click="menu('EG')">Exit Game</a></li>
            <li><a class='btn-default' @click="menu('SG')">Save Game</a></li>
            <li :class="{disabled: !canTurnInCards}"><a class="btn-default" @click="menu('TIC')">Turn In Cards</a></li>
            <li><a class='btn-default' @click="menu('SMC')">See my Cards</a></li>
            <li><a class='btn-default' @click="menu('PI')">Players Info</a></li>
            <li><a class='btn-default' @click="menu()">give me a card</a></li>
          </ul>
        </div>
        <div>
          <button class="btn btn-success" :disabled="phase === 'initialTroops'"
                        id="endTurnButton" @click="menu('ET')">End Turn</button>
        </div>
      </div>
      <ul class="info">
        <li style="display: flex; flex-wrap: wrap;">
          <strong>Current Player:</strong>
          <span style="display: flex;">&#160;{{player.name}}<icon :code="player.code" :size="18" id="icon"></icon></span>
        </li>
        <li><strong>Territories: </strong>{{player.terrCount}}</li>
        <li v-if="phase === 'initialTroops'"><strong>Total Reserves: </strong>{{player.reserves}}</li>
        <li v-else><strong>Reserves: </strong>{{player.reserves}}</li>
        <li v-if="phase === 'initialTroops'"><strong>Reserves: </strong>{{player.tempReserves}}</li>
        <li v-else><strong>Attack: </strong>{{attackLine}}</li>
      </ul>
    </div>
  </nav>
</template>

<script>
import icon from './icon'
import sounds from './sounds.js'

export default {
  name: 'header',
  components: {
    icon
  },
  props: [
    'phase', 'player', 'alert', 'round', 'attackLine', 'canCancel', 'menu', 'canTurnInCards'
  ],
  data(){
    return {
      volume: 40,
      musicOn: false
    }
  },
  mounted(){
    sounds.backgroundMusic.loop = true
  },
  destroyed(){
    sounds.resetBackgroundMusic()
  },
  watch:{
    volume(){
      sounds.backgroundMusic.volume = this.volume / 100
    }
  },
  methods: {

    setMusic(){
      if (this.musicOn){
        sounds.backgroundMusic.pause()
        this.musicOn = false
      }
      else {
        sounds.backgroundMusic.play()
        this.musicOn = true
      }
    }
  }
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
  .header-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .header-buttons {
    margin-right: 5px;
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
    flex-basis: 570px;
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
    line-height: 15px;
    font-weight: 500;
  }

  .header-buttons > div{
    margin: 2px 5px;
  }

  #icon {
    margin-left: 2px;
  }

  li a{
    cursor: pointer;
  }
  .disabled {
    pointer-events: none;
  }
  #volumeSlider {
    width: 50px;
    margin-top: 5px;
 }
 .line{
    font-size: 11px;
 }

@media(max-width: 675px){
  nav {
    font-size: 12px;
  }
  .btn {
    font-size: 12px;
  }
  .round-counter {
    font-size: 20px;
    height: 40px;
    width: 40px;
  }
  #icon {
    line-height: 8px;
  }
}
@media(min-width: 760px) and (max-width: 864px){
  .header-buttons {
    width: 180px;
  }
}
</style>
