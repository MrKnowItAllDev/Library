'use strict';

const library = [];

function Book(title, author, pages, cover, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = `./assets/${cover}.jpg`;
    this.read = read;
}

function addToLibrary(books) {

}

function createBook() {

}

function getBtn(id) {
    return document.querySelector(id);
}

const addBtn = getBtn('');
