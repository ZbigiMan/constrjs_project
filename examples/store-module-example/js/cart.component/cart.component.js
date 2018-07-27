export class CartComponent {

    constructor(shared) {

        var self = this;
        self.store = shared.store;

        // Render Cart List
        self.renderCartList = (data) => {

            let books = data.value;
            let booksList = '';
            if (books.length > 0) {
                books.forEach((book) => {
                    booksList += `<li>
                        <h1>${book.title}</h1>
                        <h2>${book.author}</h2>
                        <h4 class="--color-green">Price: ${book.price}</h4>
                        <button class="btn btn--secondary btn--outline btn--outline-red btn__remove-from-cart" type="button" data-book-id="${book.id}">Remove</button>
                        <div class="hr"></div>
                    </li>`;
                });
            } else {
                booksList = '<li><h2>Your Cart is empty.</h1></l2>';
            }

            let cartOutput = document.querySelector('.cart-output');
            cartOutput.innerHTML = booksList;

            cartOutput.addEventListener('click', self.btnRemoveFromCartClick);            
        };
        
        // "Remove from Cart" button event delegation
        self.btnRemoveFromCartClick = (event) => {
            if (event.target.className.indexOf('btn__remove-from-cart') != -1) {
                let bookId = event.target.getAttribute('data-book-id');
                self.removeFromCart(bookId);
            }
        };   

        // Remove from Cart Function
        self.removeFromCart = (bookId) => {

            let books = self.store.Get(self, 'cartTable');
          
            let selectedBook = books.filter((book) => {
                return book.id == bookId;
            })[0];
           
            self.store.Remove(self, 'cartTable', selectedBook);           
            self.store.Push(self, 'booksTable', selectedBook);
            
        };
       
         //Initial functions

        let cartTable = self.store.Get(self, 'cartTable');
        self.renderCartList({
            value: cartTable
        });
       
        self.store.Watch(self, 'cartTable', 'renderCartList');   

    }
}