const listBooks = document.querySelector('.book-list');

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.books = new Array([]);
  }

  populateFields = () => {
    localStorage.setItem('savedBooks', JSON.stringify(this.books));
  };

  removeBook(book) {
    const result = this.books.filter((b) => b !== book);
    this.books = result;
    this.populateFields();
  }

  addBook = (newBook) => {
    this.books.push(newBook);
    this.populateFields();
    this.displayBooks();
  };

  displayBooks = () => {
    listBooks.innerHTML = '';
    this.books.map((book) => {
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

export default Book;
