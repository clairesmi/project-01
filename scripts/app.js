console.log('JS Loaded')

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



// RESET - MONDAY ************
// reset game - use rps game for reset ref
// create total score and points countdown




document.addEventListener('DOMContentLoaded', () => {
  // sets size of grid - create array for cells to avoid multiple divs in html
  // also sets player position within the array of cells 
  // use let for player index as it will be changed later
  const width = 10
  const grid = document.querySelector('.grid')
  const points = document.querySelector('.points')
  const lifeCount = document.querySelector('.life-count')
  // const aliens = document.querySelector('.aliens')
  let teamAliens = []
  let teamAliens2 = []
  // const teamAliens3 = []
  const cells = []
  let playerIdx = 94
  let alienIdx = 21
  let alienIdx2 = alienIdx - width
  // let alienIdx3 = alienIdx2 - width
  let bulletIdx = playerIdx - width
  let direction = 1
  let direction2 = 1
  let total = 0
  let lives = 3

  const reset = document.querySelector('.reset')

  // function to add player to event target class list - to be called to move player around the grid
  function handleClick(e) {
    e.target.classList.add('player')
  }
  // for loop to create grid without adding too many divs 
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')
    // add event listener of 'click' to each cell with the argument of handleClick 
    // cell.addEventListener('click', handleClick)
    // makes each cell a child of grid and pushes cell into cells array
    grid.appendChild(cell)
    cells.push(cell)
  }

  // Alien movement row 1
  for (let i = 0; i < 8; i++) {
    cells[alienIdx ++].classList.add('aliens')
    // const aliens = document.querySelector('.aliens')
    teamAliens.push(alienIdx - 1)
    // console.log(teamAliens.length)
  }
  // Alien movement row 2
  for (let i = 0; i < 8; i++) {
    cells[alienIdx2 ++].classList.add('aliens')
    // const aliens = document.querySelector('.aliens')
    teamAliens2.push(alienIdx2 - 1)
    // console.log(teamAliens.length)
  }
  console.log(teamAliens)
  console.log(teamAliens2)

  // add the class of aliens to specific indexes in the grid   

  const alienMove = setInterval(() => {

    const x = Math.floor(alienIdx % width)
    cells.forEach(cell => cell.classList.remove('aliens', 'bullet', 'new'))
    // teamAliens.forEach(function(element){
    //   // console.log(element)
    //   cells[alienIdx -= 1 ].classList.remove('aliens')
    // })

    // console.log(alienIdx)
    
    // // ******** Sunday - adjust directions & collision detection ************
    if (direction === 1 && teamAliens[0] % width === 2) {
      direction = width 

    } else if (direction === width && teamAliens[0] % width === 2 ) {
      direction = -1

    } else if (direction === -1 && teamAliens[0] % width === 0) {
      direction = width

    } else if (direction === width && teamAliens[0] % width === 0) {
      direction = 1
    }

    // using map on our alien index array, to always update based on the direction
    teamAliens = teamAliens.map(alien => alien ? alien + direction : null)
    // if (direction === 1) {
    //   teamAliens = teamAliens.map(alien => alien ? alien + 1 : null)
    // }
    // if (direction === width) {
    //   teamAliens = teamAliens.map(alien => alien ? alien + width : null)
    // } 
    // if (direction === -1) {
    //   teamAliens = teamAliens.map(alien =>  alien ? alien - 1 : null) 
    // }

    console.log(teamAliens)

    // if (direction === 1 && x === width - 1) {
    //   direction = width 
    // } else if (direction === width && x === width - 1) {
    //   direction = -1
    // } else if (direction === -1 && x === 0) {
    //   direction = width
    // } else if (direction === width && x === 0) 
    //   direction = 1
      
    // alienIdx += direction
    // alienIdx += 1
    teamAliens.forEach((element) => {
      if (element) {
        cells[element].classList.add('aliens')
        
        if (cells[element].classList.contains('player')) {

          cells[element].classList.remove('aliens')
          cells[element].classList.remove('player')
          alert('you lose!')
          location.reload()

        }  
      }
    })

  }, 700)

  // *************** refactored second row ****************

  const alienMove2 = setInterval(() => {

    const x = Math.floor(alienIdx2 % width)
    
    // cells.forEach(cell => cell.classList.remove('aliens', 'bullet', 'new'))

    if (direction2 === 1 && teamAliens2[0] % width === 2) {
      direction2 = width 
    } else if (direction2 === width && teamAliens2[0] % width === 2 ) {
      direction2 = -1

    } else if (direction2 === -1 && teamAliens2[0] % width === 0) {
      direction2 = width

    } else if (direction2 === width && teamAliens2[0] % width === 0) {
      direction2 = 1
    }

    // using map on our alien index array, to always update based on the direction
    teamAliens2 = teamAliens2.map(alien2 => alien2 ? alien2 + direction2 : null)

    console.log(teamAliens2)
    
    teamAliens2.forEach((element2) => {
      if (element2) {
        cells[element2].classList.add('aliens')

        if (cells[element2].classList.contains('player')) {
          cells[element2].classList.remove('aliens')
          cells[element2].classList.remove('player')
          alert('you lose!')
          location.reload()

        }  
      }
    })

  }, 700)


  // adds 'player' class to cells at playerIdx on grid
  cells[playerIdx].classList.add('player')
  // adds event listener on keyup - removes 'player' from class list at cells[playerindex] / grid position
  document.addEventListener('keydown', (e) => {

    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)

    switch (e.keyCode) {
      // x and y axis
    // if x is bigger than 0 then 37(west) moves player left one cell  
      case 37: if (x > 0) playerIdx -= 1
        break
        // if y is bigger than 0 move - spaces of the width size (up)
      case 38: if (y > 90) playerIdx -= width
        break
        // if x is smaller than width -1 (converting grid size to array) 
        // player moves + 1 through the index array 
      case 39: if (x < width - 1) playerIdx += 1
        break
        // if y is smaller than width -1 player moves + spaces of width size (down)
      case 40: if (y < width - 1) playerIdx += width
        break
    }
    // adds 'player' class to cell at new position 
    cells[playerIdx].classList.add('player')
  })

  // bullet from shooter to alien

  document.addEventListener('keyup', () => {
    
    let bulletIdx = playerIdx - width

    if (event.keyCode === 32) {
      cells[bulletIdx].classList.add('bullet')
    
      const bulletMove = setInterval(() => {
        
        if (bulletIdx < 10) {
        
          clearInterval(bulletMove)
          cells[bulletIdx].classList.remove('bullet')
        }

        // ********* killing aliens
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

          if (total === (teamAliens.length + 1) * 100) {
            alert('You win!!')
            location.reload()
          }

          cells[bulletIdx].classList.remove('aliens')
        } 

        cells[bulletIdx].classList.remove('bullet')
        bulletIdx -= width        
        cells[bulletIdx].classList.add('bullet')

      }, 200) 
    }
  })
  // *******************************************************
     
  const alienBomb = setInterval(() => {
    let bombIdx = teamAliens[0] + width + Math.floor(Math.random() * width)
    console.log(bombIdx)
    
    cells[bombIdx].classList.add('bomb')  
    const bombDrop = setInterval(() => {

      if (bombIdx >= 90) {
        
        clearInterval(bombDrop)
        cells[bombIdx].classList.remove('bomb')
      } else {
      
        cells[bombIdx].classList.remove('bomb')
        bombIdx += width
        cells[bombIdx].classList.add('bomb')
      }
      if (bombIdx >= 90) {
        
        clearInterval(bombDrop)
        cells[bombIdx].classList.remove('bomb')
      }
      // ****************************
     
      if (bombIdx === playerIdx && lives > 0) {
        lives -= 1
        lifeCount.innerHTML = (`lives remaining: ${lives}`)
  
        if (lives === 0) {
          cells[bombIdx].classList.remove('bomb')
          alert('You lose!!')
          cells[playerIdx].classList.remove('player')
          cells[playerIdx].classList.add('player-killed')
          location.reload()
        } 
      }
            
    }, 300)

  }, 1000)

})
