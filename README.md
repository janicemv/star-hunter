# Star Hunter

## Overview
This is a simple grid-based game where the player controls a hero, collecting treasures and avoiding villains, while navigating through walls. The game keeps track of points and lives, and the player wins once they collect 10 treasures. If the player loses all their lives, the game ends.

## Features
- A dynamic game board where the player can move up, down, left, and right.
- Villains that reduce the player's lives when encountered.
- Treasures that increase the player's score.
- Walls that block the player's movement.
- Points and lives are displayed on the screen.
- The game resets when the player wins or loses.

## Gameplay
- The player controls the hero using the arrow keys (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`).
- Each time the hero moves, they might encounter:
  - **A wall:** The hero cannot pass through walls.
  - **A treasure:** The hero gains 1 point and the game spawns more villains.
  - **A villain:** The hero loses 1 life.
- The game ends when the player runs out of lives or collects 10 treasures.
  
## Code Structure
- **Game.js**: The main game logic and mechanics, including player movement, treasure collection, and villain encounters.
- **GameBoard.js**: Manages the state of the game board, such as placing treasures, villains, walls, and the hero.
  
## Development
This game is built using vanilla JavaScript, and it will be expanded by adding additional features like power-ups, levels, and different villain types.

## License
This project is open-source and available for modification.