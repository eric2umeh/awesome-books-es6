import { DateTime } from 'luxon';

const inputFormSection = document.getElementById('input-forms');
const awesomeBooksSection = document.getElementById('awesome-book');
const showListButton = document.getElementById('show-list-buttons');
const addNewButton = document.getElementById('add-new-button');
const contactInfoSection = document.getElementById('contact-infos');
const contactInfoButton = document.getElementById('contact-info-buttons');
const divTime = document.querySelector('#current-date');

setInterval(() => {
  const dts = DateTime.now();
  divTime.textContent = dts.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
}, 1000);

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

document.getElementById('current-date').innerHTML = new Date().toLocaleString();
document.getElementById('year').innerHTML = new Date().getFullYear();

const listBooks = document.querySelector('.book-list');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

const inputBook = {};
let books = new Array([]);

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    populateFields();
  }

  static addBook = (newBook) => {
    books.push(newBook);
    populateFields();
    this.displayBooks();
  };

  static displayBooks = () => {
    listBooks.innerHTML = '';
    books.map((book) => {
      const bookDiv = document.createElement('tr');
      const elementBook = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';

      elementBook.textContent = `"${book.title}" by ${book.author}`;

      bookDiv.classList.add('container-book');
      bookDiv.appendChild(elementBook);
      bookDiv.appendChild(deleteBtn);

      listBooks.appendChild(bookDiv);

      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        listBooks.removeChild(bookDiv);
      });
      return listBooks;
    });
  };
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook(new Book(inputBook.title, inputBook.author));
});

Book.displayBooks();
populateFields();
