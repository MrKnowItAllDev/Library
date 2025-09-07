'use strict';


const library = [];

// TODO: Order by read status ?

function Book(title, author, pages, cover, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.cover = cover; // Temporary, consider mapping book id to cover
    this.status = status;
}

Book.prototype.toggleStatus = function() {
    // TODO: toggle status code goes here
    this.status = !this.status;
}

// TODO: Iterate through array and append objects to the UI
// Create and append in one function ??
function addToLibrary(books) {

}

function getFile() {

    let file = document.querySelector('#fileUpload').files;
    let fileReader = new FileReader();
    if (FileReader && file && fileReader) {
        fileReader.readAsDataURL(file[0]);
        fileReader.addEventListener('loadend', (e) => {
            let img = document.querySelector('.image');
            img.src = e.target.result;
        });
    }
}
getFile();
/*
*<section class="card">
     <img src="" alt=""> // Create img element, assign path and alt=`${book.title} cover`
     <section class="card-content">
         <h1>Book Title</h1>
     </section>
</section>
*
* Use image value data for Book object cover prop
* */

function getBtn(id) {
    return document.querySelector(id);
}

const addBtn = getBtn('.add');
const removeBtn = getBtn('.remove');
const markBtn = getBtn('.mark');
const closeBtn = getBtn('.close-btn');

const modal = document.querySelector('dialog');
// const fileUpload = document.querySelector('#fileUpload');

addBtn.addEventListener('click', (e) => {
    modal.showModal();
    document.querySelector('.overlay').setAttribute('style', 'visibility: visible; opacity: 1;');
});

closeBtn.addEventListener('click', (e) => {
    modal.close();
    document.querySelector(`.overlay`).setAttribute('style', 'display: none;');
});
