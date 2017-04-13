import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './components/game_data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: []
  },
  getters: {
    players(state){
      return (id) => state.games[id].players
    },
    territories(state){
      return (id) => state.games[id].territories
    },
    game(state){
      return (id) => state.games[id].otherData
    }
  },
  mutations: {
    createGame(state, playerNames){
      const data = gameData.randomlySelectTerrs(playerNames)
      const players = gameData.asignReserves(data.players)
      state.games.push({players: players,
                    territories: data.territories,
                    otherData: {turnIndex: 0, phase: 'initialTroops', round: 1}
                  })
    },
    nextTurn(state, gameId){
      let turnIndex = state.games[gameId].otherData.turnIndex
      turnIndex++
      if (turnIndex >= state.games[gameId].players.length)
        turnIndex = 0
      state.games[gameId].otherData.turnIndex = turnIndex
    },
    setReserves(state, payload){
      state.games[payload.gameId].territories[payload.terrId].reserves += payload.amount
    },
    initialTroops(state, pl){
      let player = state.games[pl.gameId].players[pl.turnIndex]
      if (player.tempReserves > 0){
        state.games[pl.gameId].territories[pl.terrId].reserves += 1
        player.tempReserves --
        player.reserves --
      }
      else
        state.games[pl.gameId].otherData.phase = 'next'
    }
  }
})