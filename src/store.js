import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './components/game_data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {},
    version: '0.3.0'
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
    //==========Saving and Creating Games: ============
    createGame(state, playerNames){
      const data = gameData.setUpGame(playerNames)
      state.game = {version: '0.03', //change to any value in game needs to up version number
                    id: null,
                    name: '',
                    nextCard: 0,
                    players: data.players,
                    phase: 'initialTroops',
                    round: 0,
                    shuffledCards: [],
                    territories: data.territories,
                    turnIndex: data.turnIndex,
                    turnMessage: null
                  }
    },
    loadGame(state, game){
      state.game = game
    },
    setName(state, name){
      state.game.name = name
    },
    setId(state, id){
      state.game.id = id
    },

    //=============== other: ==========
    setPhase(state, phase){
      state.game.phase = phase
    },
    addTroops(state, pl){
      let player = state.game.players[pl.turnIndex]
      state.game.territories[pl.terrId].reserves += 1
      player.reserves --
      if (pl.phase === 'initialTroops')
        player.tempReserves --
      state.game.players[pl.turnIndex] = player
    },
    nextTurn(state){
      let turnIndex = state.game.turnIndex
      turnIndex++
      if (turnIndex >= state.game.players.length){
        turnIndex = 0
        if (state.game.phase != 'initialTroops')
          state.game.round++
      }
      state.game.turnIndex = turnIndex
    },
    getReserves(state, pl){
      state.game.players[state.game.turnIndex].reserves = pl.countryPoints + pl.conPoints
    },
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
          state.game.turnMessage = "initialTroops"+state.game.turnIndex
        else{
          state.game.round = 1
          state.game.phase = 'addTroops'
          const data = gameData.getReserves(state.game)
          commit('getReserves', data)
          state.game.turnMessage = data
        }
      }
    },
    addTroops({commit, state}, pl){
      let player = state.game.players[pl.turnIndex]
      if (player.reserves > 0)
        commit('addTroops', pl)
      if (player.reserves <= 0){
        state.game.phase = "attack1"
        state.game.turnMessage = "attack"
      }
    },
    attack({commit, state}, pl){
      if (pl.defendTerr.reserves <= pl.whiteLose){
        commit("conquerTerr", pl)
        commit("countTerritories")
        return true
      }
      else {
        commit("attackTerr", pl)
        return false
      }
    },
    endTurn({commit, state}){
      commit('nextTurn')
      state.game.phase = 'addTroops'
      const data = gameData.getReserves(state.game)
      commit('getReserves', data)
      state.game.turnMessage = data
    }
  }
})