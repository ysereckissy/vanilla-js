class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    isValid = () => this.title.trim() && this.author.trim() && this.isbn.trim();
}

class UI {
    addBookToList = book => {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
        list.appendChild(row);
        this.clearFields();
    }

    showAlert = (message, className) => {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearFields = () => {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteBook = targetUiElement => {
        if(-1 !== targetUiElement.className.indexOf('delete')) {
            targetUiElement.parentElement.parentElement.remove();
            this.showAlert('Book Removed!', 'success');
        }
    }
}

/// Event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);

    const ui = new UI();
    if(!book.isValid()) {
        ui.showAlert('Please fill in all the fields', 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlert('Book successfully added!', 'success');
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function (event) {
    const ui = new UI();
    ui.deleteBook(event.target);
    event.preventDefault();
});
