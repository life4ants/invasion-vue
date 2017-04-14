import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './components/game_data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {}
  },
  getters: {
    game(state){
      return () => state.game
    },
    showPopup(state){
      return () => state.game.showPopup
    }
  },
  mutations: {
    createGame(state, playerNames){
      const data = gameData.setUpGame(playerNames)
      state.game = {name: '',     round: 1,   showPopup: null, id: null,
                    phase: 'initialTroops',
                    players: data.players,
                    territories: data.territories,
                    turnIndex: data.turnIndex
                  }
    },
    loadGame(state, game){
      state.game = game
    },
    nextTurn(state){
      let turnIndex = state.game.turnIndex
      turnIndex++
      if (turnIndex >= state.game.players.length)
        turnIndex = 0
      state.game.turnIndex = turnIndex
    },
    setReserves(state, payload){//not used yet
      state.game.territories[payload.terrId].reserves += payload.amount
    },
    setName(state, name){
      state.game.name = name
    },
    setId(state, id){
      state.game.id = id
    },
    initialTroops(state, pl){
      let player = state.game.players[pl.turnIndex]
      state.game.territories[pl.terrId].reserves += 1
      player.tempReserves --
      player.reserves --
    }
  },
  actions: {
    initialTroops({commit, state}, pl){
      let player = state.game.players[pl.turnIndex]
      if (player.tempReserves > 0)
        commit('initialTroops', pl)
      if (player.tempReserves <= 0){
        commit('nextTurn', pl.gameId)
        let nextPlayer = state.game.players[state.game.turnIndex]
        nextPlayer = gameData.asignTempReserves(nextPlayer)
        state.game.showPopup = "initialTroops"+state.game.turnIndex
      }
    }
  }
})