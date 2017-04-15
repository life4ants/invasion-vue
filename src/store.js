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
    turnMessage(state){
      return () => state.game.turnMessage
    }
  },
  mutations: {
    createGame(state, playerNames){
      const data = gameData.setUpGame(playerNames)
      state.game = {name: '',     round: 0,   turnMessage: null, id: null,
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
      if (turnIndex >= state.game.players.length){
        turnIndex = 0
        if (state.game.phase != 'initialTroops')
          state.game.round++
      }
      state.game.turnIndex = turnIndex
    },
    getReserves(state, pl){
      state.game.players[state.game.turnIndex].reserves = pl.countryPoints + pl.conPoints
      console.log('reserves set')
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
      state.game.players[pl.turnIndex] = player
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
        if (nextPlayer.tempReserves > 0)
          state.game.turnMessage = "initialTroops"+state.game.turnIndex
        else{
          state.game.round = 1
          console.log('round updated')
          state.game.phase = 'addTroops'
          console.log('phase updated')
          const data = gameData.getReserves(state.game)
          console.log('data recieved')
          commit('getReserves', data)
          state.game.turnMessage = data
          console.log('turnMessage updated')
        }
      }
    }
  }
})