import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './components/game_data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {},
    version: 4
  },


  getters: {
    game(state){
      return () => state.game
    },
    turnMessage(state){
      return () => state.game.turnMessage
    }
  },


  mutations: {
    //============ attacking and conquering: =======
    conquerTerr(state, pl){
      const attackTerr = state.game.territories[pl.attackTerr.id-1]
      const defendTerr = state.game.territories[pl.defendTerr.id-1]
      attackTerr.reserves -= pl.redLose
      defendTerr.reserves = null
      defendTerr.owner = attackTerr.owner
    },
    attackTerr(state, pl){
      const attackTerr = state.game.territories[pl.attackTerr.id-1]
      const defendTerr = state.game.territories[pl.defendTerr.id-1]
      attackTerr.reserves -= pl.redLose
      defendTerr.reserves -= pl.whiteLose
    },
    passTroops(state, pl){
      state.game.territories[pl.passingTerr].reserves -= pl.troops
      state.game.territories[pl.recievingTerr].reserves += pl.troops
    },
    countTerritories(state){
      let counts = new Array(state.game.players.length).fill(0)
      for(let i = 0; i<state.game.territories.length; i++){
        counts[state.game.territories[i].owner]++
      }
      for (let i = 0; i<counts.length; i++){
        state.game.players[i].terrCount = counts[i]
      }
    },
    deletePlayer(state, id){
      let winner = state.game.players[state.game.turnIndex]
      let loser = state.game.players[id]
      winner.cards = winner.cards.concat(loser.cards)
      state.game.players.splice(id, 1)
      if (state.game.players.length === 1){
        state.game.gameOver = true
        state.game.phase = "gameOver"
      }
      else {
        if (state.game.turnIndex > id)
          state.game.turnIndex--
      }
    },

    //================= Cards: ==================
    upCardSetValue(state){
      let value = state.game.cardSetValue
      if (value < 12)
        value += 2
      else if (value < 15)
        value += 3
      else
        value += 5
    },
    drawCard(state, player){
      state.game.players[player].cards.push(state.game.nextCard)
      state.game.nextCard++
      if (state.game.nextCard > 94)
        state.game.nextCard = 0
      state.game.players[player].getsCard = false
    },

    //============== General Setters: ==============
    setPhase(state, phase){
      state.game.phase = phase
    },
    nextTurn(state){
      let turnIndex = state.game.turnIndex
      turnIndex++
      if (turnIndex >= state.game.players.length){
        turnIndex = 0
        if (state.game.phase != 'initialTroops'){//put stuff that happens at the end of every turn here
          state.game.round++
        }
      }
      state.game.turnIndex = turnIndex
    },

    //==========Saving and Creating Games: ============
    createGame(state, playerNames){
      const data = gameData.setUpGame(playerNames)
      state.game = {version: 4, //change to any value in game needs to up version number
                    id: null,
                    name: '',
                    nextCard: 0,
                    canTurnInCards: false,
                    cardSetValue: 4,
                    gameOver: false,
                    players: data.players,
                    phase: 'initialTroops',
                    round: 0,
                    shuffledCards: gameData.shuffle(gameData.cards),
                    territories: data.territories,
                    turnIndex: data.turnIndex,
                    turnMessage: null
                  }
    },
    loadGame(state, game){
      if (game.version === 3){
        game.cardSetValue = 4
        game.version = 4
        game.gameOver = false
        console.log("upgraded version 3 game to version 4")
      }
      state.game = game
    },
    setName(state, name){
      state.game.name = name
    },
    setId(state, id){
      state.game.id = id
    },

    //=============== Troops and Reserves: ==========
    addTroops(state, pl){
      let player = state.game.players[pl.turnIndex]
      state.game.territories[pl.terrId].reserves += 1
      player.reserves --
      if (pl.phase === 'initialTroops')
        player.tempReserves --
      state.game.players[pl.turnIndex] = player
    },
    add2TroopsTo(state, terr){
      state.game.territories[terr].reserves += 2
    },
    getReserves(state, pl){//getting reserves at the beginning of turn
      state.game.players[state.game.turnIndex].reserves = pl.countryPoints + pl.conPoints
    },
    addReserves(state, reserves){ //adding reserves for turning in cards
      state.game.players[state.game.turnIndex].reserves += reserves
    }
  },


  actions: {
    initialTroops({commit, state}, pl){
      let player = state.game.players[pl.turnIndex]
      if (player.tempReserves > 0)
        commit('addTroops', pl)
      if (player.tempReserves <= 0){
        commit('nextTurn')
        let nextPlayer = state.game.players[state.game.turnIndex]
        nextPlayer = gameData.asignTempReserves(nextPlayer)
        if (nextPlayer.tempReserves > 0)
          state.game.turnMessage = {type: "InTrps", data: state.game.turnIndex}
        else{
          state.game.round = 1
          state.game.phase = 'addTroops'
          const data = gameData.getReserves(state.game)
          commit('getReserves', data)
          state.game.canTurnInCards = true
          state.game.turnMessage = {type: 'Trps', data}
        }
      }
    },
    addTroops({commit, state}, pl){
      let player = state.game.players[pl.turnIndex]
      if (player.reserves > 0)
        commit('addTroops', pl)
      if (player.reserves <= 0){
        state.game.phase = "attack1"
        state.game.turnMessage = {type: 'StTurn'}
      }
    },
    attack({commit, state}, pl){
      state.game.canTurnInCards = false
      if (pl.defendTerr.reserves <= pl.whiteLose){
        commit("conquerTerr", pl)
        commit("countTerritories")
        state.game.players[state.game.turnIndex].getsCard = true
        return true
      }
      else {
        commit("attackTerr", pl)
        return false
      }
    },
    checkForEliminatedPlayers({commit, state}){
      for (let i=0; i<state.game.players.length; i++){
        if (state.game.players[i].terrCount === 0){
          let looser = state.game.players[i].name
          commit("deletePlayer", i)
          state.game.canTurnInCards = true
          return [true, looser]
        }
      }
      return [false]
    },
    endTurn({commit, state}){
      commit('nextTurn')
      state.game.phase = 'addTroops'
      const data = gameData.getReserves(state.game)
      commit('getReserves', data)
      state.game.canTurnInCards = true
      state.game.turnMessage = {type: 'Trps', data}
    },
    turnInCards({commit, state}, pl){
      let cards = pl.ids
      let player = state.game.players[state.game.turnIndex]
      let output = {reserves: state.game.cardSetValue, total: 0, ids: []}
      commit("addReserves", state.game.cardSetValue)
      commit("upCardSetValue")
      for (let i=cards.length-1; i>=0; i--){
        let terr = state.game.territories[pl.values[i]]
        if (terr.owner === state.game.turnIndex){
          output.ids.push(terr.id)
          output.total +=2
          commit("add2TroopsTo", terr.id-1)
        }
        player.cards.splice(cards[i], 1)
      }
      state.game.phase = "addTroops"
      state.game.turnMessage = {type: 'Cards', data: output}
    }
  }
})