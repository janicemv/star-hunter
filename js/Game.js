"use strict";

import { GameBoard } from "./GameBoard.js";

class Game {
    constructor(size) {
        this.size = size;
        this.gameBoard = new GameBoard(size);
        this.heroPosition = { row: Math.floor(size / 2), col: Math.floor(size / 2) };
        this.points = 0;
        this.lives = 5;
        this.addKeyboardListener();
    }

    addKeyboardListener() {
        document.addEventListener('keydown', (event) => {
            this.moveHero(event.key);
        });
    }

    moveHero(direction) {
        const pixels = document.querySelectorAll('.pixel');
        const hero = document.getElementById('hero');
        let newRow = this.heroPosition.row;
        let newCol = this.heroPosition.col;

        switch (direction) {
            case 'ArrowUp':
                if (newRow > 0) newRow--;
                break;
            case 'ArrowDown':
                if (newRow < this.size - 1) newRow++;
                break;
            case 'ArrowLeft':
                if (newCol > 0) newCol--;
                break;
            case 'ArrowRight':
                if (newCol < this.size - 1) newCol++;
                break;
        }

        const newIndex = newRow * this.size + newCol;
        const newPixel = pixels[newIndex];

        const villain = newPixel.querySelector('.villain');

        const pointsDiv = document.getElementById('total-points');
        const livesDiv = document.getElementById('total-lives');

        if (newPixel.classList.contains('wall')) {
            console.log('You hit a wall!');
            return;
        } else {
            this.heroPosition = { row: newRow, col: newCol };
            if (newPixel.classList.contains('treasure')) {
                this.points++;
                pointsDiv.innerText = this.points;
                this.gameBoard.placeVillains(1);
                newPixel.classList.remove('treasure');
                console.log(this.points);
                if (this.points === 10) {
                    console.log('You won!');
                    alert('You won the game!');
                    this.resetGame();
                }
            } else if (villain) {
                this.lives--;
                livesDiv.innerText = this.lives;
                console.log('-1 life');
                this.gameBoard.placeVillains(1);
                if (this.lives <= 0) {
                    alert('Game Over :(');
                    this.resetGame();
                }
            }
        }

        const oldPixel = pixels[this.heroPosition.row * this.size + this.heroPosition.col];
        oldPixel.innerHTML = '';
        newPixel.appendChild(hero);
    }

    resetGame() {
        this.lives = 5;
        this.points = 0;
        const pointsDiv = document.getElementById('total-points');
        const livesDiv = document.getElementById('total-lives');
        pointsDiv.innerText = this.points;
        livesDiv.innerText = this.lives;
        this.gameBoard.populate(this.size);
        this.gameBoard.placeHero(); 
        this.gameBoard.placeStars(10);
        this.gameBoard.placeWalls(7);
        this.gameBoard.placeVillains(3);
    }
}

const game = new Game(20);
