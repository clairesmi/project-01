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

//  data-id for alien group maybe?



document.addEventListener('DOMContentLoaded', () => {
  // sets size of grid - create array for cells to avoid multiple divs in html
  // also sets player position within the array of cells 
  // use let for player index as it will be changed later
  const width = 10
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 90
  let alienIdx = 11
  let direction = 1

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

  // Alien movement

  cells[alienIdx].classList.add('alien')

  const alienMove = setInterval(() => {

    const x = Math.floor(alienIdx % width)

    cells[alienIdx].classList.remove('alien')

    if (direction === 1 && x === width - 1) {
      direction = width 
    } else if (direction === width && x === width - 1) {
      direction = -1
    } else if (direction === -1 && x === 0) {
      direction = width
    } else if (direction === width && x === 0) 
      direction = 1
 
    alienIdx += direction

    cells[alienIdx].classList.add('alien')

  }, 500)




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

  
  //  *********** SATURDAY **************


  // const bulletMove = setInterval(() => {

  document.addEventListener('keyup', () => {
    let bulletIdx = playerIdx - width
    if (event.keyCode === 32) {
      cells[bulletIdx].classList.add('bullet')
    }
    const bulletMove = setInterval(() => {
      cells[bulletIdx].classList.remove('bullet')
      
      bulletIdx -= width
      
      cells[bulletIdx].classList.add('bullet')
      
    }, 500) 

  })

  const alienBomb = setInterval(() => {
    let bombIdx = alienIdx + width
    cells[bombIdx].classList.add('bomb')

    const bombDrop = setInterval(() => {

      cells[bombIdx].classList.remove('bomb')
      bombIdx += width
      cells[bombIdx].classList.add('bomb')

    }, 500)
  }, 2000)


// ********* Win Conditions ************

  if (bombIdx === playerIdx)





})
