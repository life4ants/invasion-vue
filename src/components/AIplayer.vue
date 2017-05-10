<template>
</template>

<script>

  export default {
    name: 'AIplayer',
    props: [ 'openPopup' ],
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
        console.log("it is "+this.currentPlayer.name+"\'s turn!")
        if (this.currentPlayer.isBot)
          console.log("He is a bot! I get to play!")
      }
    },
    methods: {
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
      }
    }
  }
</script>
