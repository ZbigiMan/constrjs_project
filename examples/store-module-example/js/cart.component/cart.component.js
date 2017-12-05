
export class CartComponent {

    constructor(appSettings) {

        var self = this;        
        self.store = appSettings.store;

        // Render Cart List:
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

            // "Remove from Cart" button event delegation:
            cartOutput.addEventListener('click', self.btnRemoveFromCartClick);
            //\
        }
        //\

        // "Remove from Cart" button event delegation:
        self.btnRemoveFromCartClick = (event) => {
            if (event.target.className.indexOf('btn__remove-from-cart') != -1) {
                let bookId = event.target.getAttribute('data-book-id');
                self.removeFromCart(bookId);
            }
        }
        //\

        //Remove from Cart Function:
        self.removeFromCart = (bookId) => {

            // *** StoreModule get ***
            // self.store.get(caller, table)
            let books = self.store.get(self, 'cartTable');
            //\

            let selectedBook = books.filter((book) => {
                return book.id == bookId;
            })[0];

            // *** StoreModule remove ***
            // self.store.remove(caller, table, value)
            self.store.remove(self, 'cartTable', selectedBook);
            //\

            // *** StoreModule push ***
            // self.store.push(caller, table, value)
            self.store.push(self, 'booksTable', selectedBook);
            //\
        }
        //\

         //Initial functions
      
        let cartTable = self.store.get(self, 'cartTable');
        self.renderCartList({
            value: cartTable
        });

        // Watching for changes

        // *** StoreModule watch ***
        // self.store.watch(caller, table , function*)
        // *function name: string || function() 
        self.store.watch(self, 'cartTable', 'renderCartList');
        //\   


    }
}