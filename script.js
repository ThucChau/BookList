class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI {
    // static function là những function dùng chung trong 1 app
    // chỉ có Class mới call dc static function
    static displayBooks(){
        const storedBooks = [
            {
                title: 'Co gai cua ngay hom qua',
                author: 'Nguyen Nhat Anh',
                isbn: '0001'
            },
            {
                title: 'La nam trong la',
                author: 'Nguyen Nhat Anh',
                isbn: '0002'
            },
            {
                title: 'Tren Duong Bang',
                author: 'Tony Buoi Sang',
                isbn: '0003'
            }
        ];

        const books = storedBooks;
        books.forEach((book) => {
            UI.addBookToList(book);
        })
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm remove">X</a></td>
        `;
        list.appendChild(row);
    }

    static clearfields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static removeBook(el){
        if(el.classList.contains('remove')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }
}

// Store Class
class Store {
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

}


//Event display book
document.addEventListener("DOMContentLoaded", UI.displayBooks)

//Event add book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Moi ban nhap lai!', 'danger');
    }else {
        // khoi tao Book
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        UI.clearfields();
        UI.showAlert('Them thanh cong', 'success');
    }
}) 

// Event remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
    e.preventDefault();
    UI.removeBook(e.target);
    UI.showAlert('Xoa thanh cong', 'success');
})