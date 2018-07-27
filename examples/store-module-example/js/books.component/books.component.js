export class BooksComponent {

    constructor(shared) {

        var self = this;
        self.store = shared.store;

        // Render Books List
        self.renderBooksList = (data) => {
            let books = data.value;
            let booksList = '';
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

            BooksOutput.addEventListener('click', self.btnAddToCartClick);
            
        };
        
        self.btnAddToCartClick = (event) => {
            if (event.target.className.indexOf('btn__add-to-cart') != -1) {
                let bookId = event.target.getAttribute('data-book-id');
                self.addToCart(bookId);
            }
        };
        
        // Add to Cart
        self.addToCart = (bookId) => {

            let books = self.store.Get(self, 'booksTable');

            let selectedBook = books.filter((book) => {
                return book.id == bookId;
            })[0];

            self.store.Push(self, 'cartTable', selectedBook);            
            self.store.Remove(self, 'booksTable', selectedBook);           
        };
      
        //Initial functions    
        let booksTable = self.store.Get(self, 'booksTable');
        self.renderBooksList({
            value: booksTable
        });
        
        self.store.Watch(self, 'booksTable', 'renderBooksList');
        self.store.Watch(self, 'searchTable.searchResults', 'renderBooksList');        
    }
}