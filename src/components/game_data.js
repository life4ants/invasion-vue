export default {
  mycolors:
    ["#OOOOOO", "#FF00FF", "#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FFFFFF", "#764710", "#FF8000"],

  shuffle(array){
    let ar1 = array.sort(() => 0.5 - Math.random() )
    return ar1.sort(() => 0.5 - Math.random() )
  }
}

