/// Book constructor
function Book(title, author, isbn) {
    this._title =title;
    this._author = author;
    this._isbn = isbn;
}

Book.prototype.isValid = function () {
    return (this._title.trim() && this._author.trim() && this._isbn.trim());
}
/// UI constructor
function UI() {

}
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${book._title}</td>
        <td>${book._author}</td>
        <td>${book._isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
    this.clearFields();
}

UI.prototype.showAlert = function (message, className) {
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

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
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
})

