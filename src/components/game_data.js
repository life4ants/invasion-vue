const gameData = {
  mycolors:
    ["#OOOOOO", "#FF00FF", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FFFFFF", "#764710", "#FF8000"],

  shuffle(array){
    let ran = Math.floor(Math.random() * array.length);
    let temp = array[0];
    array[0] = array[ran];
    array[ran] = temp;
    let ar1 = array.sort(() => 0.5 - Math.random() )
    return ar1.sort(() => 0.5 - Math.random() )
  },

  setUpGame(players){
    if (players.length === 0)
      return console.log('ERROR: there are no players')
    let ar = [];
    for (let i=0; i<90; i++) //fill ar with values 0-89
      ar.push(i)
    let array = this.shuffle(ar) //shuffle it up!
    let t = []

    for (let i=0; i<90;) {       //loop thru the players and asign the shuffled countries to them
      for (let j=0; j < players.length; j++) {
        if (i === 90)
          break;
        else {
          t[array[i]] = {id: array[i]+1, reserves: 1, owner: j}
          players[j].terrCount++
        }
        i++;
      }
    }
    const data = this.asignReserves(players)
    return {territories: t, players: data.players, turnIndex: data.turnIndex}
  },
  asignReserves(players){
    let ar = []
    // switch(players.length){ //the real stuff
    //   case 2:
    //     ar = [10, 0, 58, 58]
    //     break
    //   case 3:
    //     ar = [9, 0, 42, 42, 42]
    //     break
    //   case 4:
    //     ar = [9, 2, 36, 36, 37, 37]
    //     break
    //   case 5:
    //     ar = [9, 0, 33, 33, 33, 33, 33]
    //     break
    //   case 6:
    //     ar = [8, 0, 30, 30, 30, 30, 30, 30]
    //     break
    //   case 7:
    //     ar = [5, 6, 27, 27, 27, 27, 27, 27, 28]
    //     break
    //   case 8:
    //     ar = [5, 2, 24, 24, 25, 25, 25, 25, 25, 25]
    // }
    switch(players.length){ // for easy testing:
      case 2:
        ar = [5, 0, 17, 17]
        break
      case 3:
        ar = [5, 0, 12, 12, 12]
        break
      case 4:
        ar = [5, 2, 12, 12, 13, 13]
        break
      case 5:
        ar = [5, 0, 12, 12, 12, 12, 12]
        break
      case 6:
        ar = [5, 0, 9, 9, 9, 9, 9, 9]
        break
      case 7:
        ar = [3, 6, 7, 7, 7, 7, 7, 7, 8]
        break
      case 8:
        ar = [3, 2, 4, 4, 5, 5, 5, 5, 5, 5]
    }
    for (let i=0; i<players.length; i++){
      players[i].reserves = ar[i+2]
      players[i].tempReserves = ar[0]
    }
    return {players, turnIndex: ar[1]}
  },
  asignTempReserves(player){
    const r = player.reserves
    if (r < 1)
      player.tempReserves = 0
    else if (r < 3)
      player.tempReserves = 1
    else if (r < 9)
      player.tempReserves = 3
    else if (r < 30)
      player.tempReserves = 5
    else if (r < 33)
      player.tempReserves = 8
    else if (r < 50)
      player.tempReserves = 9
    else if (r >= 50)
      player.tempReserves = 10
    return player
  }
}

export default gameData
window.test = function(){
  for (var k=2; k<9; k++){
    var players = []
    for (var i=0; i<k; i++){
      players.push({reserves: 0, tempReserves: 0, terrCount: 0})
    }
    var data = gameData.setUpGame(players)
    console.log(JSON.stringify(data.players, null, 2))
    // console.log(k+" players:")
    // for (var i=0; i<data.players.length; i++){
    //   console.log('\nplayer '+i+":")
    //   console.log("territories: "+data.players[i].terrCount)
    //   console.log('reserves: '+data.players[i].reserves)
    //   if (i === data.turnIndex)
    //     console.log('goes first')
    // }
  }
}

