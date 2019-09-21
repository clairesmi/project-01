document.addEventListener('DOMContentLoaded', () => {
  // sets size of grid - create array for cells to avoid multiple divs in html
  // also sets player position within the array of cells 
  // use let for player index as it will be changed later
  const width = 10
  const grid = document.querySelector('.grid')
  const cells = []
  let playerIdx = 0
  // function to add player to event target class list - to be called to move player around the grid
  function handleClick(e) {
    e.target.classList.add('player')
  }
  // for loop to create grid without adding too many divs 
  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('DIV')
    // add event listener of 'click' to each cell with the argument of handleClick 
    cell.addEventListener('click', handleClick)
    // makes each cell a child of grid and pushes cell into cells array
    grid.appendChild(cell)
    cells.push(cell)
  }
  // adds 'player' class to cells at playerIdx on grid
  cells[playerIdx].classList.add('player')
  // adds event listener on keyup - removes 'player' from class list at cells[playerindex] / grid position
  document.addEventListener('keyup', (e) => {

    cells[playerIdx].classList.remove('player')
    const x = playerIdx % width
    const y = Math.floor(playerIdx / width)

    switch (e.keyCode) {
      // x and y axis
    // if x is bigger than 0 then 37(west) moves player left one cell  
      case 37: if (x > 0) playerIdx -= 1
        break
        // if y is bigger than 0 move - spaces of the width size (up)
      case 38: if (y > 0) playerIdx -= width
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
})
