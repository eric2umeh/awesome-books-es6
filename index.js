import { DateTime } from './modules/luxon/src/luxon.js';
import Book from './modules/index.js';

const inputFormSection = document.getElementById('input-forms');
const awesomeBooksSection = document.getElementById('awesome-book');
const showListButton = document.getElementById('show-list-buttons');
const addNewButton = document.getElementById('add-new-button');
const contactInfoSection = document.getElementById('contact-infos');
const contactInfoButton = document.getElementById('contact-info-buttons');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

// switch nav menu
const switchMode = (node) => {
  if (showListButton !== node && showListButton.classList.contains('active')) {
    showListButton.classList.remove('active');
  } else if (
    addNewButton !== node
    && addNewButton.classList.contains('active')
  ) {
    addNewButton.classList.remove('active');
  } else if (
    contactInfoButton !== node
    && contactInfoButton.classList.contains('active')
  ) {
    contactInfoButton.classList.remove('active');
  }
  node.classList.add('active');
};

const showBooksList = () => {
  switchMode(showListButton);
  awesomeBooksSection.style.display = 'flex';

  contactInfoSection.style.display = 'none';
  inputFormSection.style.display = 'none';
};

showListButton.addEventListener('click', (event) => {
  event.preventDefault();
  showBooksList();
});

addNewButton.addEventListener('click', (event) => {
  event.preventDefault();
  switchMode(addNewButton);
  inputFormSection.style.display = 'flex';
  awesomeBooksSection.style.display = 'none';
  contactInfoSection.style.display = 'none';
});

contactInfoButton.addEventListener('click', (event) => {
  event.preventDefault();
  switchMode(contactInfoButton);
  contactInfoSection.style.display = 'flex';
  awesomeBooksSection.style.display = 'none';
  inputFormSection.style.display = 'none';
});

// Luxon date and time
const time = () => {
  const dts = document.querySelector('#current-date');
  dts.textContent = DateTime.now().toLocaleString({
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
setInterval(time, 1000);

// Books
const inputBook = {};
const objBook = new Book();

if (localStorage.savedBooks) {
  objBook.books = JSON.parse(localStorage.getItem('savedBooks'));
}

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(objBook.books));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook(new Book(inputBook.title, inputBook.author));
});

Book.displayBooks();
populateFields();
