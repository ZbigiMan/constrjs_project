export class BooksComponent {
    constructor(app) {       

        this.app = app;
        var self = this;

        // Render Books Store List:
        this.renderBooksList = (data) => {
            let books = data.value;
            let booksList = ''
            if (books.length > 0) {
                books.forEach((book) => {
                    booksList += `<li>
                <h1>${book.title}</h1>
                <h3>${book.author}</h3>                    
                <p>${book.description}</p>
                <h4 class="--color-green">Price: ${book.price}</h4>
                <button class="btn btn--secondary btn--blue btn__add-to-cart" type="button" data-book-id="${book.id}">Add to cart</button>
                <div class="hr"></div>
            </li>`;
                });
            } else {
                booksList = '<li><h2>Sold Out</h2></li>';
            }
            let BooksOutput = document.querySelector('.books-store-output');
            BooksOutput.innerHTML = booksList;

            // "Add to Cart" button event delegation:
            BooksOutput.addEventListener('click', this.btnAddToCartClick);
            //\
        }
        //\

        // "Add to Cart" button event delegation:
        this.btnAddToCartClick = (event) => {
            if (event.target.className.indexOf('btn__add-to-cart') != -1) {
                let bookId = event.target.getAttribute('data-book-id');
                self.addToCart(bookId);
            }
        }
        //\

        // Add to Cart Function:
        self.addToCart = (bookId) => {

            // *** StoreModule get ***
            // app.store.get(caller, table)
            let books = self.app.store.get(self.app, 'booksTable');
            //\

            let selectedBook = books.filter((book) => {
                return book.id == bookId;
            })[0];

            // *** StoreModule push ***
            // app.store.push(caller, table, value)
            self.app.store.push(self.app, 'cartTable', selectedBook);
            //\

            // *** StoreModule remove ***
            // app.store.remove(caller, table, value)
            self.app.store.remove(self.app, 'booksTable', selectedBook);
            //\
        }
        //\
    }

}