export default {
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

  randomlySelectTerrs(players){
    if (players.length === 0)
      return console.log('ERROR: there are no players')
    let ar = [];
    for (let i=0; i<90; i++) //fill ar with values 0-89
      ar.push(i)
    let array = this.shuffle(ar) //shuffle it up!
    let t = []

    for (let i=0; i<90;) {       //loop thru the players and asign the shuffled countries to them
      for (let j=players.length-1; j >= 0; j--) {
        if (i === 90)
          break;
        else {
          t[array[i]] = {id: array[i]+1, reserves: 1, owner: j}
          players[j].terrCount++
        }
        i++;
      }
    }
    return {territories: t, players: players}
  },
  asignReserves(players){
    let ar = []
    switch(players.length){
      case 2:
        ar = [10, 58, 58]
        break
      case 3:
        ar = [9, 42, 42, 42]
        break
      case 4:
        ar = [9, 37, 37, 36, 36]
        break
      case 5:
        ar = [9, 33, 33, 33, 33, 33]
        break
      case 6:
        ar = [8, 30, 30, 30, 30, 30, 30]
        break
      case 7:
        ar = [5, 28, 27, 27, 27, 27, 27, 27]
        break
      case 8:
        ar = [5, 25, 25, 25, 25, 25, 25, 24, 24]
    }
    players[0].tempReserves = ar[0]
    for (let i=0; i<players.length; i++){
      players[i].reserves = ar[i+1]
    }
    return players
  },
  asignTempReserves(player){
    const r = player.reserves
    if (r < 1)
      player.temp_reserves = 0
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
