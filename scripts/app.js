// ******** instructions ***********

// Space Invaders is a classic arcade game from the 80s. 
// The player aims to shoot an invading alien armada, 
// before it reaches the planet's surface using a mounted gun turret.

// The player can only move left or right. The aliens also move from left to right, 
// and also down each time the reach the side of the screen. The aliens also periodically drop bombs 
// towards the player.

// Once the player has destroyed a wave of aliens, the game starts again. 
// The aim is to achieve the highest score possible before either being 
// destroyed by the aliens, or allowing them to reach the planet's surface.

// The player should be able to clear at least one wave of aliens
// The player's score should be displayed at the end of the game
// ****************************** planning ************************************
// 1. Build grid and basic styling for visibility while developing 
// 2. Create a shooter character with a div id which moves l-r on the bottom line
// 2a enable shooter on keyup/keydown to be able to shoot aliens - keyup bullet leaves from shooter square
// 3. Create a parent class of aliens which contains multiple aliens that can be controlled indvidually
// (use grid method in js) parent class to move in one block
// 4. Use grid to enable aliens to move l-r and down, use timer methods 
// 5. Enable aliens to be able to randomly drop bombs (random on alien array) (use index)
// 5a. When bomb hits shooter - replace shooter div with damaged div x 10 
// 6. If shooter is destroyed - 'Loser' (animation?)
// 7. timer to move upwards through grid - 
// 8. if square's innerhtml = alien, remove alien div
// 9. when one row of aliens is shot - 'Winner!'
// 10. Display score - (reference progress bar hw) - score = points per row of aliens - shooter life remaining  


// added extra - instructions to appear on screen on load - one letter at a time 
// 5 second countdown on loading page

document.addEventListener('DOMContentLoaded', () => {

  // GRID AND VARIABLE SETUP 
  const width = 10
  const grid = document.querySelector('.grid')
  const points = document.querySelector('.points')
  const lifeCount = document.querySelector('.life-count')
  
  const win = document.querySelector('.win')
  const lose = document.querySelector('.lose')
  const countDown = document.querySelector('.countdown')
  const instructions = document.querySelector('.instructions')
  const reset = document.querySelector('.reset')
  const starter = document.querySelector('.starter')
  const cells = []

  let teamAliens = []
  let teamAliens2 = []
  let playerIdx = 94
  let alienIdx = 21
  let alienIdx2 = alienIdx - width
  const bulletIdx = playerIdx - width
  const bombIdx = teamAliens[0] + width + Math.floor(Math.random() * width)
  let direction = 1
  let direction2 = 1
  let total = 0
  let lives = 3
  let gameOver = false

  // WIN CONDITION
  function playerWin() {
    if (total === (teamAliens.length * 2) * 100) {
      setTimeout(() => {
        grid.classList.add('hide')
        instructions.classList.add('hide')
        reset.classList.remove('hide')
      }, 200)
      setTimeout(() => {
        win.classList.replace('hide', 'win', 'reset')
      }, 400)  
    }
  }
  // ALIEN COLLIDE LOSE CONDITION
  function aliensCollide() {
    teamAliens.forEach((element) => {
      if (element) {
        cells[element].classList.add('aliens')
        if (cells[element].classList.contains('player')) {
          cells[element].classList.remove('aliens', 'player')
          clearInterval(alienMove)
          gameOver = true

          setTimeout(() => {
            grid.classList.add('hide')
            instructions.classList.add('hide')
            reset.classList.remove('hide')
            lifeCount.innerHTML = (`lives remaining: ${0}`)
          }, 200)
          setTimeout(() => {
            lose.classList.replace('hide', 'lose', 'reset')
          }, 400)
        }
      }              
    })
  }
  // ALIENS COLLIDE ROW 2 LOSE CONDITION
  function aliensCollide2 () {
    if (gameOver) return
    teamAliens2.forEach((element) => {
      if (element) {
        cells[element].classList.add('aliens')
        if (cells[element].classList.contains('player')) {
          cells[element].classList.remove('aliens')
          cells[element].classList.remove('player')
          clearInterval(alienMove2)
          gameOver = true

          setTimeout(() => {
            grid.classList.add('hide')
            instructions.classList.add('hide')
            reset.classList.remove('hide')
            lifeCount.innerHTML = (`lives remaining: ${0}`)
          }, 200)
          setTimeout(() => {
            lose.classList.replace('hide', 'lose', 'reset')
          }, 400)
        }
      }
    })
  }

  setTimeout(() => {
    points.classList.add('hide')
    lifeCount.classList.add('hide')
    instructions.classList.remove('hide')
    countDown.classList.add('hide')

  }, 200)

  starter.addEventListener('click', () => {

    setTimeout(() => {
      grid.classList.remove('hide')
      instructions.classList.add('hide')
      points.classList.remove('hide')
      lifeCount.classList.remove('hide')
      starter.classList.add('hide')
      countDown.classList.add('hide')
    })
  }, 1500)

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV') 
    grid.appendChild(cell)
    cells.push(cell)
  }

  win.classList.add('hide')
  lose.classList.add('hide')
  reset.classList.add('hide')

  // Alien movement row 1
  for (let i = 0; i < 8; i++) {
    cells[alienIdx ++].classList.add('aliens')
    teamAliens.push(alienIdx - 1)
  }
  // Alien movement row 2
  for (let i = 0; i < 8; i++) {
    cells[alienIdx2 ++].classList.add('aliens')
    teamAliens2.push(alienIdx2 - 1)
  }

  // ALIEN MOVEMENTS
  const alienMove = setInterval(() => {
    cells.forEach(cell => cell.classList.remove('aliens', 'bullet'))

    if (direction === 1 && teamAliens[0] % width === 2) {
      direction = width 
    } else if (direction === width && teamAliens[0] % width === 2 ) {
      direction = -1
    } else if (direction === -1 && teamAliens[0] % width === 0) {
      direction = width
    } else if (direction === width && teamAliens[0] % width === 0) {
      direction = 1
    }
    teamAliens = teamAliens.map(alien => alien ? alien + direction : null)
    aliensCollide()
  }, 1000)

  const alienMove2 = setInterval(() => {

    if (direction2 === 1 && teamAliens2[0] % width === 2) {
      direction2 = width 
    } else if (direction2 === width && teamAliens2[0] % width === 2 ) {
      direction2 = -1
    } else if (direction2 === -1 && teamAliens2[0] % width === 0) {
      direction2 = width
    } else if (direction2 === width && teamAliens2[0] % width === 0) {
      direction2 = 1
    }
    teamAliens2 = teamAliens2.map(alien => alien ? alien + direction2 : null)
    aliensCollide2()
  }, 1000)

  // ADD PLAYER TO GRID
  cells[playerIdx].classList.add('player')
  document.addEventListener('keydown', (e) => {

    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)

    switch (e.keyCode) {
      case 37: if (x > 0) playerIdx -= 1
        break
      case 38: if (y > 90) playerIdx -= width
        break
      case 39: if (x < width - 1) playerIdx += 1
        break
      case 40: if (y < width - 1) playerIdx += width
        break
    }
    cells[playerIdx].classList.add('player')
  })

  // BULLET MOVEMENT AND CONDITION IF PLAYER SHOOTS ALIEN
  document.addEventListener('keyup', () => {    
    let bulletIdx = playerIdx - width
    
    if (event.keyCode === 32) {
      cells[bulletIdx].classList.add('bullet')

      const bulletMove = setInterval(() => {        
        cells[bulletIdx].classList.remove('bullet')

        // SEPARATE FUNCTION FOR BULLET COLLISION WITH ALIENS 
        if (cells[bulletIdx].classList.contains('aliens')) {
          clearInterval(bulletMove, alienMove)

          teamAliens = teamAliens.map(alien => {
            if (alien === bulletIdx) return null
            return alien
          })
          teamAliens2 = teamAliens2.map(alien2 => {
            if (alien2 === bulletIdx) return null
            return alien2
          })
          total += 100
          points.innerHTML = (`points total: ${total}`)

          playerWin()

          cells[bulletIdx].classList.remove('aliens')
        } 
        cells[bulletIdx].classList.remove('bullet') 
        if (bulletIdx > 10) {
          bulletIdx -= width  
          cells[bulletIdx].classList.add('bullet')
        } else if (bulletIdx < 0) {
          cells[bulletIdx].classList.remove('bullet')
        }

      }, 300) 
    }
    
  })

  // ALIENS BOMB THE PLAYER
  const alienBomb = setInterval(() => {
    let bombIdx = teamAliens[0] + width + Math.floor(Math.random() * width)
    if (bombIdx <= 90) {
      cells[bombIdx].classList.add('bomb')
    } else {
      clearInterval(alienBomb)
    }
    const bombDrop = setInterval(() => {  
      
      if (bombIdx === playerIdx && lives !== 0) {
        cells[bombIdx].classList.remove('bomb')
        lives -= 1
        cells[bombIdx - width].classList.add('player-killed')
      }
      setTimeout(() => {
        cells[bombIdx - width].classList.remove('player-killed')
      }, 100)

      if (bombIdx < 90) {
        cells[bombIdx].classList.remove('bomb')
        bombIdx += width
        cells[bombIdx].classList.add('bomb')
      } else if (bombIdx >= 90) {
        clearInterval(bombDrop)
        cells[bombIdx].classList.remove('bomb')
      }

      if (lives === 0) {
        cells[playerIdx].classList.remove('player')
        setTimeout(() => {
          grid.classList.add('hide')
          instructions.classList.add('hide')
          reset.classList.remove('hide')
        }, 200)
        setTimeout(() => {
          lose.classList.replace('hide', 'lose', 'reset')
          win.classList.add('hide')
          starter.classList.add('hide')
        }, 400)
        
      }
      lifeCount.innerHTML = (`lives remaining: ${lives}`)

    }, 200)
  }, 1000)
  
  reset.addEventListener('click', () => {
    location.reload()
    gameOver = false
  })  
})
