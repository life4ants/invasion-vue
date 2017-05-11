import Vue from 'vue'
import Vuex from 'vuex'
import gameData from './components/game_data.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {},
    version: 9
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
      const loser = state.game.players.findIndex((e) => e.id === defendTerr.owner)
      state.game.players[loser].terrCount--
      const winner = state.game.players.findIndex((e) => e.id === attackTerr.owner)
      state.game.players[winner].terrCount++
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
    // countTerritories(state){
    //   let players = state.game.players
    //   let counts = {}
    //   for(let i = 0; i<state.game.territories.length; i++){
    //     counts[state.game.territories[i].owner]++
    //   }
    //   for (let i = 0; i<players.length; i++){
    //     state.game.players[i].terrCount = counts[players[i].id]
    //   }
    // },
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
      state.game.cardSetValue = value
    },
    drawCard(state){
      const player = state.game.players[state.game.turnIndex]
      player.cards.push(state.game.nextCard)
      player.getsCard = false
      if (player.cards.length >= state.game.settings.numOfCards)
        player.mustTurnInCards = true
      state.game.nextCard++
      if (state.game.nextCard > 94)
        state.game.nextCard = 0
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
    startTurn(state, pl){
      state.game.players[state.game.turnIndex].reserves = pl.countryPoints + pl.conPoints
      state.game.phase = 'addTroops'
      state.game.canTurnInCards = true
      state.game.setsTurnedIn = 0
      state.game.turnMessage = {type: 'Trps', data: pl}
    },
    changeName(state, pl){
      state.game.players[pl.id].name = pl.name
    },
    setAutoroll(state, pl){
      const index = state.game.players.findIndex((e) => e.id === pl.id)
      state.game.players[index].settings.autoroll = pl.value
    },

    //==========Saving and Creating Games: ============
    createGame(state, pl){
      const data = gameData.setUpGame(pl.players)
      state.game = {version: 9, //change to any value in game needs to up version number
                    id: null,
                    name: '',
                    nextCard: 0,
                    canTurnInCards: false,
                    setsTurnedIn: 0,
                    cardSetValue: 4,
                    gameOver: false,
                    players: data.players,
                    phase: 'initialTroops',
                    round: 0,
                    settings: pl.settings,
                    shuffledCards: gameData.shuffle(gameData.cards),
                    territories: data.territories,
                    turnIndex: data.turnIndex,
                    turnMessage: null
                  }
    },
    loadGame(state, game){
      if (game.version === 4){
        game.settings = {defenseWinsTie: false, numOfSets: 2, numOfCards: 8}
        game.version = 5
        console.log("upgrading to version 5")
      }
      if (game.version === 5){
        game.setsTurnedIn = 0
        game.version = 6
        console.log("upgrading to version 6")
      }
      if ([6, 7].includes(game.version)){
        for (let i=0; i<game.players.length; i++){
          game.players[i].settings = {autoroll: false}
          game.players[i].isBot = false
        }
        game.version = 8
        alert("upgrading to version 8")
      }
      if (game.version === 8){
        for (let i=0; i<game.players.length; i++){
          game.players[i].id = i
        }
        game.version = 9
        console.log("upgrading to version 9")
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
    addTroops(state, terrId){
      let player = state.game.players[state.game.turnIndex]
      state.game.territories[terrId].reserves += 1
      player.reserves --
      if (state.game.phase === 'initialTroops')
        player.tempReserves --
      state.game.players[state.game.turnIndex] = player
    },
    add2TroopsTo(state, terr){
      state.game.territories[terr].reserves += 2
    },
    addReserves(state, reserves){
      state.game.players[state.game.turnIndex].reserves += reserves
    }
  },


  actions: {
    initialTroops({commit, state}, terrId){
      let player = state.game.players[state.game.turnIndex]
      if (player.tempReserves > 0)
        commit('addTroops', terrId)
      if (player.tempReserves <= 0){
        commit('nextTurn')
        let nextPlayer = state.game.players[state.game.turnIndex]
        nextPlayer = gameData.asignTempReserves(nextPlayer)
        if (nextPlayer.tempReserves > 0)
          state.game.turnMessage = {type: "InTrps", data: state.game.turnIndex}
        else{//time for the first player's turn
          state.game.round = 1
          const data = gameData.getReserves(state.game)
          commit('startTurn', data)
        }
      }
    },
    addTroops({commit, state}, terrId){
      let player = state.game.players[state.game.turnIndex]
      if (player.reserves > 0)
        commit('addTroops', terrId)
      if (player.reserves <= 0){
        state.game.phase = "attack1"
        state.game.turnMessage = {type: 'StTurn'}
      }
    },
    attack({commit, state}, pl){
      state.game.canTurnInCards = false
      if (pl.defendTerr.reserves <= pl.whiteLose){
        commit("conquerTerr", pl)
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
          state.game.setsTurnedIn = 0
          return [true, looser]
        }
      }
      return [false]
    },
    endTurn({commit, state}){
      commit('nextTurn')
      const data = gameData.getReserves(state.game)
      commit('startTurn', data)
    },
    turnInCards({commit, state}, pl){
      let cards = pl.ids
      let player = state.game.players[state.game.turnIndex]
      let output = {reserves: state.game.cardSetValue, total: 0, ids: []}
      commit("addReserves", state.game.cardSetValue)
      commit("upCardSetValue")
      state.game.setsTurnedIn++
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
      player.mustTurnInCards = false
      state.game.turnMessage = {type: 'Cards', data: output}
    }
  }
})