![General Assembly Logo](/assets/ga-logo.png)
# Software Engineering Immersive – Project 01

This was my first project of the Software Engineering Immersive course – week 4 

# Space Invaders 

This is a browser game of Space Invaders built with Vanilla Javascript. 

## Built with

1.	HTML 5
2.	CSS
3.	Javascript 
4.	Github


## Deployment 

The game is deployed on GitHub Pages and it can be found here: https://clairesmi.github.io/space-invaders//
 
## Getting Started

Use the clone button to download the game source code. Open the index.html file in your browser and the game should start, if not check the console for any issues. 

## Game Architecture

Space Invaders is a game where the player aims to kill an army of aliens that are moving closer to the player whilst trying to drop bombs on them. The player is playing against the computer which is programmed to have the aim of trying to bomb the player’s spaceship. The player begins with 3 lives.

![Game in Play](/assets/Screenshot-game-play.png)

 The player can use the left and right arrows to move the player along the bottom of the game screen. The player is able to shoot towards the alien invaders by pressing the spacebar key. 

On spacebar key up, bullets are released and move upwards towards the aliens. If a bullet collides with an alien then the alien is destroyed and is removed from the game. 

There are two ways the aliens can destroy the player – 
1.	By bombing the player 3 times so that the player loses all of their lives
2.	By reaching the player’s location and colliding with the player

 The aliens are programmed to automatically start moving towards the player when the player has clicked the start button. They drop bombs every second which move towards the player. If the bombs collide with the player, there is an animation to show that the player has lost a life. 

If the aliens collide with the player then the game ends and the game over screen is shown. 

An example of the code for the movement of the aliens and the collision function is shown below. 

```
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
  ```

```
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
            lifeCount.innerHTML = (`lives remaining: ${0}`)
          }, 400)
        }
      }              
    })
  }
  ```


## Win conditions - 

If the player kills all of the aliens, reaching a total of 1600 points then the player wins. The game then ends and the win screen is displayed.  

## Lose conditions – 

If the lose conditions as described above are met then the game ends and the game over screen is shown

## Challenges and future improvements  

 The main challenges in building this game were 

1.	Creating logic for moving the aliens as an array through the grid - it was easier to create two arrays which move in unison, however this meant duplicating code and could be refactored in the future

2.	Setting timers for multiple elements of the game. The timing of the bombs being dropped from the array of aliens was a challenge as it meant ensuring that they were coordinated well so that the overall speed of the game was difficult enough for the player. 

3.	Creating the count down for the players lives – I encountered a bug when developing this countdown which meant that when the player was bombed for the first time it would lose 2 lives instead of 1. I overcame this issue by ensuring that my code was clean and refactored in a way that separated the countdown from the set interval which controlled the animation of the explosion.   
