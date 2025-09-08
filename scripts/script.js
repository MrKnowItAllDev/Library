'use strict';

const library = [];

function Book(title, author, desc, pages, cover, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.description = desc;
    this.pages = pages;
    this.cover = cover;
    this.status = status;
}

// Use to update
Book.prototype.toggleStatus = function() {
    this.status = !this.status;
}

function addToLibrary(library) {
    const submitBtn = document.querySelector('#add');
    const form = document.querySelector('form');
    let formData = new FormData(form, submitBtn);

    if (!submitBtn) return;

    const book = new Book();
    for (const [key, value] of formData) {
        if (key !== 'status') book[key] = value;
    }

    const status = document.querySelector('#status');
    book['status'] = status.checked;

    library.push(book);
}

function displayLibrary(library) {
    const parent = document.querySelector('.content');
    parent.innerHTML = ``;

    for (const book of library) {
        const card = document.createElement('section');
        const content = document.createElement('section');
        const heading = document.createElement('h2');
        const desc = document.createElement('p');
        const author = document.createElement('p');
        const status  = document.createElement('button');
        const numPages = document.createElement('p');
        const remove = document.createElement('button');

        card.classList.add('card');
        content.classList.add('card-content');
        status.classList.add('btn');
        status.classList.add('mark');
        remove.classList.add('btn');
        remove.classList.add('remove');

        card.dataset.id = book.id;
        heading.textContent = book.title ? book.title : 'Default Title';
        author.textContent = book.author ? `Author: ${book.author}` : 'Admin';
        desc.textContent = book.description ? book.description : 'Default description';
        remove.textContent = `Delete`;
        numPages.textContent = `Total pages: ${book.pages}`;

        if (book.status) {
            status.classList.add('checked');
            status.textContent = `Has been read`;
        } else {
            status.classList.add('unchecked');
            status.textContent = `Not yet read`;
        }

        remove.addEventListener('click', (e) => {
            library.splice(library.indexOf(book));
            clear(parent, book);
        });

        status.addEventListener('click', (e) => {
            book.toggleStatus();
            if (book.status) {
                if (status.classList.contains('unchecked')) status.classList.remove('unchecked');
                status.classList.add('checked');
                status.textContent = `Has been read`;
            } else {
                if (status.classList.contains('checked')) status.classList.remove('checked');
                status.classList.add('unchecked');
                status.textContent = `Not yet read`;
            }
        });

        content.appendChild(heading);
        content.appendChild(author);
        content.appendChild(desc);
        content.appendChild(numPages);
        content.appendChild(status);
        content.appendChild(remove);
        card.appendChild(content);
        parent.appendChild(card);
    }
}

function clear(parent, book) {
    if (parent.children) {
        for (const node of parent.children) {
            if (node.dataset.id === book.id) parent.removeChild(node);
        }
    }
}

const getBtn = (id) => {
    return document.querySelector(id) || Array.from(document.querySelectorAll(id));
}

const addBtn = getBtn('.add');
const closeBtn = getBtn('.close-btn');

const btn = document.querySelector('#add');
const modal = document.querySelector('dialog');

addBtn.addEventListener('click', (e) => {
    modal.showModal();
    document.querySelector('.overlay').setAttribute('style', 'visibility: visible; opacity: 1;');
});

closeBtn.addEventListener('click', (e) => {
    modal.close();
    document.querySelector(`.overlay`).setAttribute('style', 'display: none;');
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    addToLibrary(library);
    displayLibrary(library);
});

btn.addEventListener('click', () => {
    modal.close();
    document.querySelector(`.overlay`).setAttribute('style', 'display: none;');
});
