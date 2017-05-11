<template>
</template>

<script>
import gameData from "./game_data.js"

export default {
  name: 'AIplayer',
  props: [ 'openPopup' ],
  mounted(){
    window.ai = this
  },
  computed: {
    game(){
      return this.$store.getters.game()
    },
    currentPlayer(){
      return this.game.players[this.game.turnIndex]
    }
  },
  watch: {
    currentPlayer(){
      if (this.currentPlayer.isBot){
        if (this.game.phase === "initialTroops"){
          console.log(this.currentPlayer.name+" placed initialTroops")
          this.initialTroops()
        }
      }
    }
  },
  methods: {
    getPlayerById(id){
      const index = this.game.players.findIndex((e) => e.id === id)
      return this.game.players[index]
    },
    initialTroops(){
      let output = this.pickContinent();
      for (let i=0; i<output.length; i++){
        if (!this.checkIfContinentIsSufficiant(output[i])){
          this.distributeInitialTroops(output[i])
          return
        }
      }
    },
    distributeInitialTroops(continent) {
      const terr = this.findEnemiesByContinent(continent);
      let tempReserves = this.currentPlayer.tempReserves

      for (let i=0; i<terr.length; i++){ //remove territories with 0 or 1 enemies
        if (terr[i].enemies < 2){
          terr.splice(i, 1)
          i--
        }
      }
      let y = 0
      for (let i=1; i<terr.length; i++){ //find first territory with less troops than the first one
        if (this.game.territories[terr[i].index].reserves < this.game.territories[terr[0].index].reserves) {
          y = i
          break
        }
      }
      for (let i=y; tempReserves>0; i++){
        i = i >= terr.length ? 0 : i
        this.$store.dispatch("initialTroops", terr[i].index)
        tempReserves--
      }
    },
    pickContinent() {
      let data = this.continentData()
      let enemyFactor = []
      let myFactor = []

      for (let i=0; i<9; i++){
        if (data.enemyTerrs[i] > 0)
          enemyFactor[i] = 1/data.enemyTerrs[i]
        else
          enemyFactor[i] = 2
      }
      for (let i=0; i<9; i++){
        myFactor[i] = data.myTerrs[i]/this.currentPlayer.terrCount
      }
      let show = []
      for (let i=0; i<9; i++){
        show[i] = myFactor[i] * enemyFactor[i]
      }
      show[0] *= 10
      show[1] *= 6
      show[2] *= 16
      show[3] *= 4
      show[4] *= 10
      show[5] *= 6
      show[6] *= 6
      show[7] *= 22
      show[8] *= 19
      for (let i=0; i<9; i++){
        if (show[i] !== 0)
          show[i] += (data.myStrength[i]/20) - (data.enemyStrength[i]/20)
      }
      return this.sortIndexes(show)
    },
    findEnemiesByContinent(continent) {
      let keys = this.getContinentKeys(continent)
      let con = [], x = 0
      for (let i = keys[0]; i<keys[1]; i++) {
        if (this.game.territories[i].owner === this.currentPlayer.id){
          con[x] = {"index": i, "enemies": 0}
          for (let j = 0; j<gameData.territoryInfo[i+1].borders.length; j++) {
            if (this.game.territories[gameData.territoryInfo[i+1].borders[j]-1].owner != this.currentPlayer.id)
              con[x].enemies++
          }
          x++
        }
      }
      return con
    },
    continentData(){
      let myStrength = new Array(9).fill(0)
      let enemyStrength = new Array(9).fill(0)
      let myTerrs = new Array(9).fill(0)
      let enemyTerrs = new Array(9).fill(0)

      for (let i=0; i<90; i++){
        let id = 8
        if (i < 14)
          id = 0
        else if (i < 26)
          id = 1
        else if (i < 33)
          id = 2
        else if (i < 48)
          id = 3
        else if (i < 55)
          id = 4
        else if (i < 67)
          id = 5
        else if (i < 78)
          id = 6
        else if (i < 85)
          id = 7

        if (this.game.territories[i].owner === this.currentPlayer.id){
          myStrength[id]+= this.game.territories[i].reserves-1
          myTerrs[id]++
        }
        else {
          enemyStrength[id]+= this.game.territories[i].reserves-1
          enemyTerrs[id]++
        }
      }
      return {myStrength, enemyStrength, myTerrs, enemyTerrs}
    },

    // ===== general checkers: =========
    checkIfContinentIsSufficiant(continent){
      let keys = this.getContinentKeys(continent)
      let myStrength = 0
      let enemyStrength = 0
      for (let i = keys[0]; i<keys[1]; i++) {
        if (this.game.territories[i].owner === this.game.turnIndex)
          myStrength += this.game.territories[i].reserves-1
        else
          enemyStrength += this.game.territories[i].reserves
      }
      return myStrength > (enemyStrength * 1.5)+5
    },
    getContinentKeys(continent) {//LOW values
      switch(continent){
        case 0:
          return [0, 14]
        case 1:
          return [14, 26]
        case 2:
          return [26, 33]
        case 3:
          return [33, 48]
        case 4:
          return [48, 55]
        case 5:
          return [55, 67]
        case 6:
          return [67, 78]
        case 7:
          return [78, 85]
        case 8:
          return [85, 90]
        default:
          console.error("continent out of range")
      }
    },
    inSameContinent(first, second) {
      if (first >= 0 && second >=0 && first <14 && second <14 ||
        first >= 14 && second >=14 && first <26 && second <26 ||
        first >= 26 && second >=26 && first <33 && second <33 ||
        first >= 33 && second >=33 && first <48 && second <48 ||
        first >= 48 && second >=48 && first <55 && second <55 ||
        first >= 55 && second >=55 && first <67 && second <67 ||
        first >= 67 && second >=67 && first <78 && second <78 ||
        first >= 78 && second >=78 && first <85 && second <85 ||
        first >= 85 && second >=85 && first <90 && second <90 )
        return true;
      else
        return false;
    },
    sortIndexes(array){// returns the indexes of the array values from highest to lowest
      let output = [];
      for (let i = 0; i<array.length; i++){
        let high = 0
        for (let j=0; j<array.length; j++){
          if (array[j] > array[high])
            high = j
        }
        if (array[high] === 0){// flag 0 values
          output[i] = "x"
        }
        else
          output[i] = high
        array[high] = -10;
      }
      for (let i = 0; i<output.length; i++){
        if (output[i] === "x"){//remove 0 values
          output.splice(i, 1)
          i--
        }
      }
      return output;
    }
  }//end of methods
}
</script>
