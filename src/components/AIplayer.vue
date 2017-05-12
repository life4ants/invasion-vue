<template>
</template>

<script>
import gameData from "./game_data.js"

export default {
  name: 'AIplayer',
  props: [ 'computerAttack', 'trigger'],
  data(){
    return {
      withinContinent: false
    }
  },
  mounted(){
    window.ai = this
  },
  computed: {
    game(){
      return this.$store.getters.game()
    },
    currentPlayer(){
      return this.game.players[this.game.turnIndex]
    },
    turnMessage(){
      return this.game.turnMessage
    }
  },
  watch: {
    currentPlayer(){
      if (this.currentPlayer.isBot){
        if (this.game.phase === "initialTroops"){
          console.log(this.currentPlayer.name+" placed initialTroops")
          this.initialTroops()
        }
        else if (this.game.phase === "addTroops"){
          console.log(this.currentPlayer.name+" added troops")
          this.addTroops()
        }
        else {
          console.log(this.game.phase)
          console.log(this.currentPlayer.name)
        }
      }
    },
    turnMessage(){
      if (this.currentPlayer.isBot){
        if (this.game.turnMessage.type === 'StTurn'){
          console.log("start attacking")
          if (this.computerFindToAttack())
            console.log("no one to attack")
        }
      }
      else
        console.log("AIs are spying on you!")
    },
    trigger(){
      console.log(this.trigger, "do it again!")
      if (this.computerFindToAttack())
        console.log("all done attacking")
      else
        console.log("not done")
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
      console.log("nowhere to place troops because every continent has enough")
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
      for (let i=this.findFirstLowTerr(terr); tempReserves>0; i++){
        i = i >= terr.length ? 0 : i
        this.$store.dispatch("initialTroops", terr[i].index)
        tempReserves--
      }
    },
    addTroops(){
      const con = this.game.turnMessage.data.conIds //contients player owns
      if (con.length > 0){ // player has at least one continent
        console.log("I have a continent. running the other code")
        let picked = this.pickContinent()
        for (var i=0; i<con.length; i++){
          for (var j=0; j<picked.length; j++){
            if (picked[j] === con[i]){
              picked.splice(j, 1) // remove owned continents from picked
              break
            }
          }
        }
        let array = []
        for (let i=0; i<con.length; i++){ //add all territories with enemies in the regions players owns to an array
          let E = this.findEnemiesByContinent(con[i]);
          for (var j=0; j<E.length; j++){
            if (E[j].enemies > 0)
              array.push(E[j].index)
           }
        }
        this.distributeTroopsByIndex(array, 2) //put troops on all the territories in the array

        let reserves = this.currentPlayer.reserves
        for (var i=0; reserves > 0; i++){// put troops on the territories in the other regions
          console.log(i)
          if (i > 25)
            return
          if (i >= picked.length){ // if any left, put them everywhere
            this.distributeTroopsByIndex(this.myCountriesWithEnemies(), i-picked.length+3)
          }
          else {
            let E = this.findEnemiesByContinent(picked[i])
            let array = []
            for (var j=0; j<E.length; j++){
              if (E[j].enemies > 0)
                array.push(E[j].index)
            }
            this.distributeTroopsByIndex(array, 2)
          }
          reserves = this.currentPlayer.reserves
        }
        this.withinContinent = false
      }
      else {
        let picked = this.pickContinent()
        for (let i=0; i<picked.length; i++){
          if (!this.checkIfContinentIsSufficiant(picked[i])){
              this.distributeComputerTroops(picked[i])
          }
        }
        this.withinContinent = true
      }
    },
    distributeComputerTroops(continentId){
      let con = this.findEnemiesByContinent(continentId)
      let reserves = this.currentPlayer.reserves

      for (let i=0; i<con.length; i++){ //put 1 troop on territories with one enemy
        if (con[i].enemies === 1){
          if (this.game.territories[con[i].index] < 3 && reserves > 0){
            reserves--
            this.$store.dispatch("addTroops", con[i].index)
          }
          con.splice(i, 1) //then remove them
          i--
        }
        else if (con[i].enemies === 0){ //also remove territories with no enemies
          con.splice(i, 1);
          i--
        }
      }
      for (let i = this.findFirstLowTerr(con); reserves>0; i++){
        if (i >= con.length){
          if (this.checkIfContinentIsSufficiant(continentId)){
            return
          }
          else
            i=0
        }
        this.$store.dispatch("addTroops", con[i].index)
        reserves--
      }
    },
    distributeTroopsByIndex(indexArray, num){
      let reserves = this.currentPlayer.reserves
      for (let i=0, x=0; x<indexArray.length; i++){
        if (i >= indexArray.length)
          i=0, x=0;
        if (this.enemyStrengthByCountry(indexArray[i]) > this.game.territories[indexArray[i]].reserves-num && reserves > 0){
          this.$store.dispatch("addTroops", indexArray[i])
          reserves--
        }
        else
          x++
      }
    },
    computerFindToAttack(){
      let con = this.myCountriesWithEnemies()
      for (let i=0; i<con.length; i++){
        let bordering = gameData.territoryInfo[con[i]+1].borders
        for (let j=0; j<bordering.length; j++){
          if (this.game.territories[bordering[j]-1].owner !== this.currentPlayer.id){
            if (this.withinContinent && this.inSameContinent(con[i], bordering[j]-1) || !this.withinContinent){
              if (this.game.territories[con[i]].reserves > 2){
                this.computerAttack(con[i], bordering[j]-1)
                return false
                // if (computerAttack(myCounWithEnem[i], countryInfo[myCounWithEnem[i]].borders[j]))
                //   return false;
                // else
                //   j--;
              }
            }
          }
        }

      }
    return true
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
    myCountriesWithEnemies(){
      let output = []
      for (let i=0; i<90; i++){
        if (this.game.territories[i].owner === this.currentPlayer.id){
          let bordering = gameData.territoryInfo[i+1].borders
          for (let j=0; j<bordering.length; j++){
            if (this.game.territories[bordering[j]-1].owner != this.currentPlayer.id){
              output.push(i)
              break
            }
          }
        }
      }
      return output
    },
    enemyStrengthByTerritory(terr){
      let bordering = gameData.territoryInfo[terr+1].borders
      let enemies = []
      for (let i=0; i<bordering.length; i++){
        if (this.game.territories[terr].owner !== this.currentPlayer.id)
          enemies.push(this.game.territories[bordering[i]-1].reserves)
      }
      let x=0, y=0
      for (var i=1; i<enemies.length; i++){
        if (enemies[i] > enemies[x])
          x = i
      }
      for (var i=0; i<enemies.length; i++){
        if (i !== x)
          y+= enemies[i]
      }
      return enemies[x] ? enemies[x] + (y/4) : 0
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
    },
    findFirstLowTerr(terrsArray){//finds the first territory with less troops than the first one
      let output = 0
      for (let i=1; i<terrsArray.length; i++){
        if (this.game.territories[terrsArray[i].index].reserves < this.game.territories[terrsArray[0].index].reserves) {
          output = i
          break
        }
      }
      return output
    }
  }//end of methods
}
</script>
