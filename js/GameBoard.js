"use strict";

export class GameBoard {
    constructor(size) {
        this.size = size;
        this.board = document.getElementById('board');
        this.heroPosition = { row: Math.floor(size / 2), col: Math.floor(size / 2) }; // Posição inicial do herói
        this.populate(size);
        this.placeHero();
        this.placeStars(10);
        this.placeWalls(7);
        this.placeVillains(4);
        this.startMovement(300);
    }

    populate(size) {
        this.board.innerHTML = '';
        this.board.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        this.board.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;

        for (let i = 0; i < this.size * this.size; i++) {
            const div = document.createElement('div');
            div.classList.add('pixel');
            this.board.appendChild(div);
        }
    }

    placeHero() {
        const pixels = document.querySelectorAll('.pixel');
        const heroIcon = document.createElement('i');
        heroIcon.classList.add('fa-solid', 'fa-shield-heart', 'icon');
        heroIcon.id = 'hero';

        const initialIndex = this.heroPosition.row * this.size + this.heroPosition.col;
        pixels[initialIndex].appendChild(heroIcon);
    }

    placeWalls(number) {
        const pixels = document.querySelectorAll('.pixel');
        let wallsPlaced = 0;
        while (wallsPlaced < number) {
            const randomIndex = Math.floor(Math.random() * (this.size * this.size));
            const pixel = pixels[randomIndex];
            if (!pixel.querySelector('i')) {
                const wallIcon = document.createElement('i');
                wallIcon.classList.add('fa-solid', 'fa-bars');
                pixel.classList.add('wall');
                pixel.appendChild(wallIcon);
                wallsPlaced++;
            }
        }
    }

    placeStars(number) {
        const pixels = document.querySelectorAll('.pixel');
        let starsPlaced = 0;
        while (starsPlaced < number) {
            const randomIndex = Math.floor(Math.random() * (this.size * this.size));
            const pixel = pixels[randomIndex];
            if (!pixel.querySelector('i')) {
                const starIcon = document.createElement('i');
                starIcon.classList.add('fa-solid', 'fa-star');
                pixel.classList.add('treasure');
                pixel.appendChild(starIcon);
                starsPlaced++;
            }
        }
    }

    placeVillains(number) {
        const pixels = document.querySelectorAll('.pixel');
        let villainsPlaced = 0;
        while (villainsPlaced < number) {
            const randomIndex = Math.floor(Math.random() * (this.size * this.size));
            const pixel = pixels[randomIndex];

            if (!pixel.querySelector('i')) {
                const villainIcon = document.createElement('i');
                villainIcon.classList.add('fa-solid', 'fa-meteor', 'villain');
                pixel.appendChild(villainIcon);
                villainsPlaced++;
            }
        }
    }

    startMovement(interval) {
        setInterval(() => {
            this.moveMeteors();
        }, interval); 
    }

    moveMeteors() {
        const pixels = document.querySelectorAll('.pixel');
        const villains = document.querySelectorAll('.villain');

        villains.forEach(villain => {
            const currentPixel = villain.closest('.pixel');
            const currentPixelIndex = Array.from(pixels).indexOf(currentPixel);
            const currentRow = Math.floor(currentPixelIndex / this.size);
            const currentCol = currentPixelIndex % this.size;

            const directions = [
                { row: -1, col: 0 },  // Up
                { row: 1, col: 0 },   // Down
                { row: 0, col: -1 },  // Left
                { row: 0, col: 1 }    // Right
            ];
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            let newRow = currentRow + randomDirection.row;
            let newCol = currentCol + randomDirection.col;

            if (newRow < 0 || newRow >= this.size || newCol < 0 || newCol >= this.size) {
                return;
            }

            const newPixelIndex = newRow * this.size + newCol;
            const newPixel = pixels[newPixelIndex];

            if (newPixel.classList.contains('wall') || newPixel.querySelector('i')) {
                return;
            }

            const oldPixel = pixels[currentPixelIndex];
            oldPixel.innerHTML = '';
            newPixel.appendChild(villain); 
        });
    }
}
