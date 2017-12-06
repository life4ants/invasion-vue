var isOdd = true;
var territoryInfo = [
  {name: "placeholder",           borders: [1, 85, 90]},
  {name: "Alaska",                borders: [2, 3]},
  {name: "Yukon Territory",       borders: [1, 3, 4]},
  {name: "British Columbia",      borders: [1, 2, 4, 5, 48, 49, 50]},
  {name: "Northwest Territories", borders: [2, 3, 5, 6, 7]},
  {name: "Alberta",               borders: [3, 4, 6, 48]},
  {name: "Saskatchewan",          borders: [4, 5, 7, 8, 39, 48]},
  {name: "Nunavut",               borders: [4, 6, 8, 10]},
  {name: "Manitoba",              borders: [6, 7, 9, 38, 39]},
  {name: "Ontario",               borders: [8, 10, 17, 24, 38]},
  {name: "Quebec",                borders: [7, 9, 11, 12, 14, 15, 16, 17]},
  {name: "Labrador",              borders: [10, 12]},
  {name: "Newfoundland",          borders: [10, 11, 13]},
  {name: "Nova Scotia",           borders: [12, 14]},
  {name: "New Brunswick",         borders: [10, 13, 15]},
  {name: "Maine",                 borders: [10, 14, 16]},
  {name: "Massachusetts",         borders: [10, 15, 17]},
  {name: "New York",              borders: [9, 10, 16, 18]},
  {name: "Pennsylvania",          borders: [17, 19, 20, 21]},
  {name: "Virginia",              borders: [18, 20, 22, 27, 28]},
  {name: "West Virginia",         borders: [18, 19, 21, 22]},
  {name: "Ohio",                  borders: [18, 20, 22, 23, 24]},
  {name: "Kentucy",               borders: [19, 20, 21, 23, 26, 27, 36]},
  {name: "Indiana",               borders: [21, 22, 24, 26]},
  {name: "Michigan",              borders: [9, 21, 23, 25]},
  {name: "Wisconsin",             borders: [24, 26, 37, 38]},
  {name: "Illinois",              borders: [22, 23, 25, 36, 37]},
  {name: "Tennessee",             borders: [19, 22, 28, 30, 32, 33, 35, 36]},
  {name: "North Carolina",        borders: [19, 27, 29, 30]},
  {name: "South Carolina",        borders: [28, 30]},
  {name: "Georgia",               borders: [27, 28, 29, 31, 32]},
  {name: "Florida",               borders: [30, 32, 87, 88]},
  {name: "Alabama",               borders: [27, 30, 31, 33]},
  {name: "Mississippi",           borders: [27, 32, 34, 35]},
  {name: "Louisiana",             borders: [33, 35, 44]},
  {name: "Arkansas",              borders: [27, 33, 34, 36, 43, 44]},
  {name: "Missouri",              borders: [22, 26, 27, 35, 37, 41, 42, 43]},
  {name: "Iowa",                  borders: [25, 26, 36, 38, 40, 41]},
  {name: "Minnesota",             borders: [8, 9, 25, 37, 39, 40]},
  {name: "North Dakota",          borders: [6, 8, 38, 40, 48]},
  {name: "South Dakota",          borders: [37, 38, 39, 41, 47, 48]},
  {name: "Nebraska",              borders: [36, 37, 40, 42, 46, 47]},
  {name: "Kansas",                borders: [36, 41, 43, 46]},
  {name: "Oklahoma",              borders: [35, 36, 42, 44, 45, 46]},
  {name: "Texas",                 borders: [34, 35, 43, 45, 60, 61, 67]},
  {name: "New Mexico",            borders: [43, 44, 46, 55, 57, 60]},
  {name: "Colorado",              borders: [41, 42, 43, 45, 47, 54]},
  {name: "Wyoming",               borders: [40, 41, 46, 48, 49, 54]},
  {name: "Montana",               borders: [3, 5, 6, 39, 40, 47, 49]},
  {name: "Idaho",                 borders: [3, 47, 48, 50, 51, 53, 54]},
  {name: "Washington",            borders: [3, 49, 51]},
  {name: "Oregon",                borders: [49, 50, 52, 53]},
  {name: "California",            borders: [51, 53, 55, 56]},
  {name: "Nevada",                borders: [49, 51, 52, 54, 55]},
  {name: "Utah",                  borders: [46, 47, 49, 53, 55]},
  {name: "Arizona",               borders: [45, 52, 53, 54, 56, 57]},
  {name: "Baja California",       borders: [52, 55, 57, 58]},
  {name: "Sonora",                borders: [45, 55, 56, 58, 59, 60]},
  {name: "Baja Calif. de Sur",    borders: [56, 57, 59]},
  {name: "Sinaloa",               borders: [57, 58, 60, 62, 63]},
  {name: "Chihuahua",             borders: [44, 45, 57, 59, 61, 62]},
  {name: "Coahuila",              borders: [44, 60, 62, 64, 66, 67]},
  {name: "Durango",               borders: [59, 60, 61, 63, 64]},
  {name: "Nayarit",               borders: [59, 62, 64, 71]},
  {name: "Zacatecas",             borders: [61, 62, 63, 65, 66, 70, 71]},
  {name: "San Luis Potosi",       borders: [64, 66, 67, 68, 69, 70]},
  {name: "Nuevo Leon",            borders: [61, 64, 65, 67]},
  {name: "Tamaulipas",            borders: [44, 61, 65, 66, 68]},
  {name: "Veracruz",              borders: [65, 67, 69, 74, 75, 76]},
  {name: "Puebla",                borders: [65, 68, 70, 72, 73, 74]},
  {name: "Guanajuato",            borders: [64, 65, 69, 71, 72]},
  {name: "Jalisco",               borders: [63, 64, 70, 72]},
  {name: "Michoacan",             borders: [69, 70, 71, 73]},
  {name: "Guerrero",              borders: [69, 72, 74]},
  {name: "Oaxaca",                borders: [68, 69, 73, 75]},
  {name: "Chiapas",               borders: [68, 74, 76, 80]},
  {name: "Campeche",              borders: [68, 75, 77, 78, 80]},
  {name: "Yucatan",               borders: [76, 78]},
  {name: "Quintana Roo",          borders: [76, 77, 79, 80, 87]},
  {name: "Belize",                borders: [78, 80, 82]},
  {name: "Guatemala",             borders: [75, 76, 78, 79, 81, 82]},
  {name: "El Salvador",           borders: [80, 82, 83]},
  {name: "Honduras",              borders: [79, 80, 81, 83]},
  {name: "Nicaragua",             borders: [81, 82, 84]},
  {name: "Costa Rica",            borders: [83, 85]},
  {name: "Panama",                borders: [84]},
  {name: "Jamaica",               borders: [87, 89]},
  {name: "Cuba",                  borders: [31, 78, 86, 88, 89]},
  {name: "Bahamas",               borders: [31, 87, 90]},
  {name: "Haiti",                 borders: [86, 87, 90]},
  {name: "Dominican Republic",    borders: [88, 89]}
  ]

  function initializeCards(){
    let cards = [];
    for (let i=0; i<90; i++){
      cards[i] = {"case": i % 3, "name": territoryInfo[i+1].name, "number": i+1};
    }
    for (let i=90; i<94; i++)
      cards[i] = {"case": 3, "name": "Wild", "number": i+1};
    return cards;
  }

  const gameData = {
  mycolors: ["#OOOOOO", "#FF00FF", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FFFFFF", "#764710", "#FF8000"],
  cards: initializeCards(),
  territoryInfo: territoryInfo,

  canFight(country1, country2){
    for (let i = 0; i<this.territoryInfo[country1].borders.length; i++){
      if (this.territoryInfo[country1].borders[i] === country2)
         return true;
    }
    return false;
  },

  shuffle(input){
    let array = input.slice()
    let ran = Math.floor(Math.random() * array.length);
    let temp = array[0];
    array[0] = array[ran];
    array[ran] = temp;
    let ar1 = array.sort(() => 0.5 - Math.random() )
    return ar1.sort(() => 0.5 - Math.random() )
  },

  setUpGame(players){
    if (players.length === 0)
      return console.error('there are no players')
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
    switch(players.length){ //the real stuff
      case 2:
        ar = [10, 0, 58, 58]
        break
      case 3:
        ar = [9, 0, 42, 42, 42]
        break
      case 4:
        ar = [9, 2, 36, 36, 37, 37]
        break
      case 5:
        ar = [9, 0, 33, 33, 33, 33, 33]
        break
      case 6:
        ar = [8, 0, 30, 30, 30, 30, 30, 30]
        break
      case 7:
        ar = [5, 6, 27, 27, 27, 27, 27, 27, 28]
        break
      case 8:
        ar = [5, 2, 24, 24, 25, 25, 25, 25, 25, 25]
    }
    // switch(players.length){ // for easy testing:
    //   case 2:
    //     ar = [5, 0, 17, 17]
    //     break
    //   case 3:
    //     ar = [5, 0, 12, 12, 12]
    //     break
    //   case 4:
    //     ar = [5, 2, 12, 12, 13, 13]
    //     break
    //   case 5:
    //     ar = [5, 0, 12, 12, 12, 12, 12]
    //     break
    //   case 6:
    //     ar = [5, 0, 9, 9, 9, 9, 9, 9]
    //     break
    //   case 7:
    //     ar = [3, 6, 7, 7, 7, 7, 7, 7, 8]
    //     break
    //   case 8:
    //     ar = [3, 2, 4, 4, 5, 5, 5, 5, 5, 5]
    // }
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
  },

  getReserves(game){
    const player = game.players[game.turnIndex]
    let countryPoints = 0
    if (player.terrCount > 11) {
      if (game.round === 1)
        countryPoints = Math.floor(player.terrCount / 4)
      else
        countryPoints = Math.floor(player.terrCount / 3)
    }
    else
      countryPoints = 3;

    const continents = this.reservesFromContinents(game.territories, player.id)
    return {countryPoints, conPoints: continents.reserves, messages: continents.messages, conIds: continents.conIds}
  },

  reservesFromContinents(territories, id){
    const continents = this.checkForContinent(territories, id)
    let output = {"reserves": 0, "messages": [], conIds: []}
    const reserves = [8,7,4,9,5,7,7,3,2]
    const messages = [
      "8 troops for owning Canada",
      "7 troops for owning Northeastern US",
      "4 troops for owning Southeastern US",
      "9 troops for owning Central US",
      "5 troops for owning Western US",
      "7 troops for owning Northern Mexico",
      "7 troops for owning Southern Mexico",
      "3 troops for owning Central America",
      "2 troops for owning the Caribbean"]
    for (let i=0; i<9; i++){
      if (continents[i]){
        output.reserves += reserves[i]
        output.messages.push(messages[i])
        output.conIds.push(i)
      }
    }
    return output
  },

  checkForContinent(territories, id){
    let continents = []
    for (let i=0; i<9; i++){ continents[i] = true }

    for (let i=0;  i<14; i++){if (territories[i].owner != id){continents[0] = false; break } }
    for (let i=14; i<26; i++){if (territories[i].owner != id){continents[1] = false; break } }
    for (let i=26; i<33; i++){if (territories[i].owner != id){continents[2] = false; break } }
    for (let i=33; i<48; i++){if (territories[i].owner != id){continents[3] = false; break } }
    for (let i=48; i<55; i++){if (territories[i].owner != id){continents[4] = false; break } }
    for (let i=55; i<67; i++){if (territories[i].owner != id){continents[5] = false; break } }
    for (let i=67; i<78; i++){if (territories[i].owner != id){continents[6] = false; break } }
    for (let i=78; i<85; i++){if (territories[i].owner != id){continents[7] = false; break } }
    for (let i=85; i<90; i++){if (territories[i].owner != id){continents[8] = false; break } }
    return continents
  },

  runAttack(R, W, defenseWinsTie){
    let diceW = [Math.floor(Math.random() * (6)+1), Math.floor(Math.random() * (6)+1)];
    let diceR = [Math.floor(Math.random() * (6)+1), Math.floor(Math.random() * (6)+1), Math.floor(Math.random() * (6)+1)];
    let white_high, white_low;
    let red_high, red_low;
    let whiteLose = 0;
    let redLose = 0;
    let tie = 0;
    // console.log("defenseWinsTie is:", defenseWinsTie)

    if (W === 2){
      // console.log("defender rolled:", diceW[0], diceW[1])
      if (diceW[0] > diceW[1]){
        white_high = diceW[0];
        white_low = diceW[1];
      }
      else {
        white_high = diceW[1];
        white_low = diceW[0];
      }
    }
    else {
      // console.log("defender rolled:", diceW[0])
      white_high = diceW[0];
      white_low = 0;
    }

    if (R === 1) {
      // console.log("attacker rolled:", diceR[0])
      red_high = diceR[0];
      red_low = 0;
    }
    else if (R === 2) {
      // console.log("attacker rolled:", diceR[0], diceR[1])
      if (diceR[0] > diceR[1]){
        red_high = diceR[0];
        red_low = diceR[1];
      }
      else {
        red_high = diceR[1];
        red_low = diceR[0];
      }
    }
    else if (R === 3){
      // console.log("attacker rolled:", diceR[0], diceR[1], diceR[2])
      if (diceR[0] >= diceR[1] && diceR[0] > diceR[2]){ //diceR[0] is the biggest, or tied for biggest
        red_high = diceR[0];
        if (diceR[1] > diceR[2])
          red_low = diceR[1];
        else
          red_low = diceR[2];
      }
      else if (diceR[1] > diceR[0] && diceR[1] > diceR[2]){ //diceR[1] is biggest
        red_high = diceR[1];
        if (diceR[0] > diceR[2])
          red_low = diceR[0];
        else
          red_low = diceR[2];
      }
      else {
        red_high = diceR[2];
        if (diceR[0] > diceR[1])
          red_low = diceR[0];
        else
          red_low = diceR[1];
      }
    }

    if (red_high > white_high)
      whiteLose++;
    else if (red_high === white_high){
      if (defenseWinsTie)
        redLose++;
      else
        tie += 0.5;
    }
    else
      redLose++;

    if (white_low === 0 || red_low === 0){}
    else if (red_low > white_low)
        whiteLose++;
    else if (red_low === white_low){
      if (defenseWinsTie)
        redLose++;
      else
        tie += 0.5;
    }
    else
      redLose++;

    if (tie === 1) {
      whiteLose++;
      redLose++;
    }
    else if (tie > 0)
    {
      if (isOdd) {redLose++; isOdd = false}
      else {whiteLose++; isOdd = true}
    }

    return {whiteLose, redLose}
  },
  checkSetOfCards(cards){
    if (cards.length < 3)
      return false
    if (cards.length >= 5)
      return true
    let man = 0, horse = 0, cannon = 0;
    for (let i = 0; i<cards.length; i++){
      switch(this.cards[cards[i]].case){
        case 0:
          man++
          break
        case 1:
          horse++
          break
        case 2:
          cannon++
          break
        case 3:
          return true // if one is a wild, we have a match
      }
    }
    if ((cannon >= 3 || man >= 3 || horse >= 3) || (cannon >= 1 && man >= 1 && horse >= 1))
        return true
    else
        return false
  },
  findSetOfCards(cards){
    let cardValues = cards.map((val) => this.cards[val].case)
    let man = 0, horse = 0, cannon = 0

    for (let i=0; i<cardValues.length; i++){
      switch(cardValues[i]){
        case 0:
          man++
          break
        case 1:
          horse++
          break
        case 2:
          cannon++
      }
    }
    if (man >= 3)
      return this.pick3ofAKind(cardValues, 0)
    else if (horse >= 3)
      return this.pick3ofAKind(cardValues, 1)
    else if (cannon >= 3)
      return this.pick3ofAKind(cardValues, 2)
    else if ((cannon >= 1 && man >= 1 && horse >= 1))
      return this.pick1ofEachKind(cardValues)
    else
      return this.pickWildand2Others(cardValues)
  },
  pickWildand2Others(values){
    let output = [null]
    let x=0
    for (let i=0; i<values.length; i++){
      if (values[i] === 3 && output[0] === null)
        output[0] = i++
      if (x<2){
        output.push(i)
        x++
      }
    }
    return output
  },
  pick1ofEachKind(values){
    let output = []
    for (let i=0; i<values.length; i++){
      if (values[i] < 3)
        output[values[i]] = i
    }
    return output
  },
  pick3ofAKind(values, kind){
    let output = []
    let x = 0
    for (let i=0; x<3; i++){
      if (i > values.length)
        return console.error("less than 3 cards of one type!")
      if (values[i] === kind){
        output[x] = i
        x++
      }
    }
    return output
  },
  // checkContinuityEx(territories, owner, startTerr, list, distances, dist){
  //   list.push(startTerr)
  //   distances.push(dist)
  //   for (let i=0; i<this.territoryInfo[startTerr].borders.length; i++){
  //     let id = this.territoryInfo[startTerr].borders[i]
  //     if (territories[id-1].owner === owner && !list.includes(id)){
  //       let data = this.checkContinuityEx(territories, owner, id, list, distances, dist+1)
  //       list.concat(data.list)
  //       distances.concat(data.distances)
  //     }
  //   }
  //   return {list, distances}
  // },
  checkContinuity(territories, owner, startTerr, list){
    list.push(startTerr)
    for (let i=0; i<this.territoryInfo[startTerr].borders.length; i++){
      let id = this.territoryInfo[startTerr].borders[i]
      if (territories[id-1].owner === owner && !list.includes(id)){
        list = this.checkContinuity(territories, owner, id, list)
      }
    }
    return list
  },
  getDistances(list, dist){// [[44], []], 1
    for (let i=0; i<list[dist-1].length; i++){
      let bordering = this.territoryInfo[list[dist-1][i]].borders
      for (let j=0; j<bordering.length; j++){
        if (!list[dist-1].includes(bordering[j]) && !list[dist].includes(bordering[j])){
          if (dist > 1 && !list[dist-2].includes(bordering[j]) || dist === 1)
            list[dist].push(bordering[j])
        }
      }
    }
    if (list[dist].length < 1){
      list.pop()
      return list
    }
    else {
      list.push([])
      return this.getDistances(list, dist+1)
    }

  }
  // unique(a){
  //   for(let i=0; i<a.length; ++i) {
  //     for (let j=i+1; j<a.length; ++j) {
  //       if(a[i] === a[j])
  //         a.splice(j--, 1);
  //     }
  //   }
  //   return a
  // }
}

export default gameData
window.test = function(x){
  if (x != 1 && x != 2){
    console.log("please give a 1 or 2 as an argument")
    return
  }
  for (let k=2; k<9; k++){
    let players = []
    for (let i=0; i<k; i++){
      players.push({reserves: 0, tempReserves: 0, terrCount: 0})
    }
    let data = gameData.setUpGame(players)
    if (x === 1)
      console.log(JSON.stringify(data.players, null, 2))
    else {
      console.log(k+" players:")
      for (let i=0; i<data.players.length; i++){
        console.log('\nplayer '+i+":")
        console.log("territories: "+data.players[i].terrCount)
        console.log('reserves: '+data.players[i].reserves)
        if (i === data.turnIndex)
          console.log('goes first')
      }
    }
  }
}
window.testCards = (ar) => {
  for (let i=0; i< 3; i++){
    console.log(gameData.territoryInfo[ar[i]].name)
    console.log(gameData.cards[ar[i]].case)
  }
  return gameData.checkSetOfCards(ar)
}
window.testReserves = (turnIndex) => {
  let territories = []
  for (let i=0; i<90; i++){
    if (i < 26)
     territories[i] = {owner: 0}
    else if (i < 33)
      territories[i] = {owner: 1}
    else if (i < 55)
      territories[i] = {owner: 2}
    else if (i < 67)
      territories[i] = {owner: 3}
    else if (i < 78)
      territories[i] = {owner: 4}
    else if (i < 85)
      territories[i] = {owner: 5}
    else
      territories[i] = {owner: 6}
  }

  let game = {
    players: [{code:22,name:"Fred",terrCount:26},
                {code:53,name:"Bill",terrCount:7},
                {code:15,name:"Roslyn",terrCount:22},
                {code:41,name:"Maria",terrCount:12},
                {code:36,name:"Kyle",terrCount:11},
                {code:8,name:"Edward",terrCount:7},
                {code:17,name:"Joseph",terrCount:5}],
                territories,
                turnIndex,
                round: 1
  }
  console.log(game.players[turnIndex])
  console.log(gameData.getReserves(game))
}
