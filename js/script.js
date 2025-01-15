"use strict";


const board = document.getElementById('board');


function populate(size) {

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        board.appendChild(div);
    }
}

function placeHero(size) {
    const centralRow = Math.floor(size / 2);
    const centralCol = Math.floor(size / 2);
    const middleIndex = (centralRow * size) + centralCol;

    const pixels = document.querySelectorAll('.pixel');

    const heroIcon = document.createElement('i');
    heroIcon.classList.add('fa-solid', 'fa-shield-heart', 'icon');
    heroIcon.id = 'hero';

    pixels[middleIndex].appendChild(heroIcon);
}

function placeWalls(size, number) {
    const pixels = document.querySelectorAll('.pixel');
    let wallsPlaced = 0;
    while (wallsPlaced < number) {
        const randomIndex = Math.floor(Math.random() * (size * size));
        const pixel = pixels[randomIndex];
        if (!pixel.querySelector('i')) {
            const wallIcon = document.createElement('i');
            wallIcon.classList.add('fa-solid', 'fa-bars', 'wall');
            pixel.appendChild(wallIcon);
            wallsPlaced++;
        }
    }
}

function placeStars(size, number) {
    const pixels = document.querySelectorAll('.pixel');
    let starsPlaced = 0;
    while (starsPlaced < number) {
        const randomIndex = Math.floor(Math.random() * (size * size));
        const pixel = pixels[randomIndex];
        if (!pixel.querySelector('i')) {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fa-solid', 'fa-star', 'treasure');
            pixel.appendChild(starIcon);
            starsPlaced++;
        }
    }
}

function placeVillain(size) {
    const pixels = document.querySelectorAll('.pixel');
    const randomIndex = Math.floor(Math.random() * (size * size));
    const pixel = pixels[randomIndex];

    if (!pixel.querySelector('i')) {
        const villainIcon = document.createElement('i');
        villainIcon.classList.add('fa-solid', 'fa-meteor');
        villainIcon.id = 'villain';
        pixel.appendChild(villainIcon);
        starsPlaced++;
    }
}




populate(20);
placeHero(20);
placeStars(20, 10);
placeWalls(20,7);
placeVillain(20);