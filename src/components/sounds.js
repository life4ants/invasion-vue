export default {
  troops1: new Audio("http://www.andrewdbuck.com/invasion/pics/troops1.mp3"),
  troops2: new Audio("http://www.andrewdbuck.com/invasion/pics/troops2.mp3"),
  startTurn: new Audio("http://www.andrewdbuck.com/invasion/pics/startTurn.mp3"),
  attack1: new Audio("http://www.andrewdbuck.com/invasion/pics/attack1.mp3"),
  attack2: new Audio("http://www.andrewdbuck.com/invasion/pics/attack2.mp3"),
  attack3: new Audio("http://www.andrewdbuck.com/invasion/pics/attack3.mp3"),
  conquer: new Audio("http://www.andrewdbuck.com/invasion/pics/conquer.mp3"),
  viewCards: new Audio("http://www.andrewdbuck.com/invasion/pics/viewcards.mp3"),
  gameOver: new Audio("http://www.andrewdbuck.com/invasion/pics/gameOver.mp3"),
  backgroundMusic: new Audio("http://www.andrewdbuck.com/invasion/pics/music.mp3"),
  isOdd: true,
  resetBackgroundMusic(){
    this.backgroundMusic.pause()
    this.backgroundMusic.currentTime = 0
    this.backgroundMusic.volume = 0.4
  },
  playTroops(){
    if (this.isOdd){
      if (this.troops2.currentTime != 0){
        this.troops2.pause()
        this.troops2.currentTime = 0
      }
      this.troops1.play()
      this.isOdd = false
    }
    else {
      if (this.troops1.currentTime != 0){
        this.troops1.pause()
        this.troops1.currentTime = 0
      }
      this.troops2.play()
      this.isOdd = true
    }
  },
  playStartTurn(){
    if (!this.troops2.paused){
      this.troops2.pause()
      this.troops2.currentTime = 0
    }
    if (!this.troops1.paused){
      this.troops1.pause()
      this.troops1.currentTime = 0
    }
    this.startTurn.play()
  },
  playAttack3(){
    if (!this.attack2.paused){
      this.attack2.pause()
      this.attack2.currentTime = 0
    }
    this.attack3.play()
  },
  playGameOver(){
    if (!this.backgroundMusic.paused)
      this.backgroundMusic.pause()
    this.gameOver.play()
  }
}