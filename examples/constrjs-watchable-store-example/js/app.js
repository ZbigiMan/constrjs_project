require("../styles/main.scss");
import 'mdn-polyfills/NodeList.forEach';

import { DOMModule } from '@zbigiman/constrjs.dom.module';
//import { StoreModule } from '@zbigiman/constrjs.store.module';
import { StoreModule } from '../../../source/constrjs.store.module/store.module';

class App {
    constructor() {

        var app = this;

        app.DOMModule = new DOMModule();

        app.store = new StoreModule({
            store: {
                booksTable: [{
                    id: 1,
                    title: 'Some Book',
                    author: 'Some Author',
                    description: 'About Some Book',
                    price: '$0.11'
                }, {
                    id: 2,
                    title: 'Other Book',
                    author: 'Other Author',
                    description: 'About Other Book',
                    price: '$0.09'
                }, {
                    id: 3,
                    title: 'Another Book',
                    author: 'Another Author',
                    description: 'Another Some Book',
                    price: '$0.39'
                }, {
                    id: 4,
                    title: 'Some Else Book',
                    author: 'Some Else Author',
                    description: 'About Some Else Book',
                    price: '$0.21'
                }],
                cartTable: new Array(),
                searchTable: {
                    searchInput: String,
                    searchResults: new Array()
                }
            },
            console: false
        });

        //Render Books Store List
        app.renderBooksStoreList = (books) => {
            let booksList = ''
            books.forEach((book) => {
                booksList += `<li>
                    <h1>${book.title}</h1>
                    <h2>${book.author}</h2>                    
                    <p>${book.description}</p>
                    <h3>${book.price}</h3>
                    <button class="btn btn--secondary btn--blue btn__add-to-cart" type="button" data-book-id="${book.id}">Add to cart</button>
                    <div class="hr"></div>
                </li>`;
            });
            let booksStoreOutput = document.querySelector('.books-store-output');
            booksStoreOutput.innerHTML = booksList;

            //Add to Cart button on click
            booksStoreOutput.addEventListener('click', app.btnAddToCartClick);
            //\
        }
        //\

        //Add to Cart button on click
        app.btnAddToCartClick = (event) => {
            if (event.target.className.indexOf('btn__add-to-cart') != -1) {
                let bookId = event.target.getAttribute('data-book-id');
                app.addToCart(bookId);
            }
        }
        //\

        //Render Cart List
        app.renderCartList = (books) => {
            let booksList = ''
            books.forEach((book) => {
                booksList += `<li>
                    <h1>${book.title}</h1>
                    <h2>${book.author}</h2>                   
                    <h3>${book.price}</h3>
                    <button class="btn btn--secondary btn--outline btn--outline-red btn__remove-from-cart" type="button" data-book-id="${book.id}">Remove</button>
                    <div class="hr"></div>
                </li>`;
            });
            let cartOutput = document.querySelector('.cart-output');
            cartOutput.innerHTML = booksList;
            cartOutput.addEventListener('click', app.btnRemoveFromCartClick);
            //\
        }

        //Remove from Cart button on click 
        app.btnRemoveFromCartClick = (event) => {
            if (event.target.className.indexOf('btn__remove-from-cart') != -1) {
                let bookId = event.target.getAttribute('data-book-id');
                app.removeFromCart(bookId);
            }
        }
        //\

        //Add to Cart
        app.addToCart = (bookId) => {
            let books = app.store.get(app, 'booksTable');
            let selectedBook = books.filter((book) => {
                return book.id == bookId;
            })[0];

            //app.store.push 
            app.store.push(app, 'cartTable', selectedBook);
            app.store.remove(app,'booksTable',selectedBook);
        }
        //\

        //Remove from Cart
        app.removeFromCart = (bookId) => {
            let books = app.store.get(app, 'cartTable');
            let selectedBook = books.filter((book) => {
                return book.id == bookId;
            })[0];
            app.store.remove(app, 'cartTable', selectedBook);
            app.store.push(app,'booksTable',selectedBook);
        }
        //\

        //Watching booksTable
        app.store.watch(app, 'booksTable', 'renderBooksStoreList');
        //\

        //Watching cartTable 
        app.store.watch(app, 'cartTable', 'renderCartList');
        //\        

        //Books Stroe Search

        //Show search bar
        app.toggleVal = (val) => {
            return !val;
        }
        var showSearch = false;
        document.querySelector('#search').addEventListener('click', (event) => {
            showSearch = app.toggleVal(showSearch);
            let searchBar = document.querySelector('.search-bar');

            if (showSearch === true) {
                app.DOMModule.addClass(searchBar, 'search-bar--visible');
                app.DOMModule.addClass(document.body, 'search-bar--visible');
                document.querySelector('#searchInput').focus();
            } else {
                app.DOMModule.removeClass(searchBar, 'search-bar--visible');
                app.DOMModule.removeClass(document.body, 'search-bar--visible');
            }
        });
        //\

        //Search function

        //Search Input
        document.querySelector('#searchInput').addEventListener('keyup', (event) => {
            app.store.set(app, 'searchTable.searchInput', event.target.value);
        });

        //Watching Search Input
        app.store.watch(app, 'searchTable.searchInput', (searchQuery) => {
            let books = app.store.get(app, 'booksTable');
            let searchResults = books.filter((book) => {
                if (book.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
                    return book.title;
            });
            if (searchResults.length === 0) {
                searchResults = books;
            }
            app.store.set(app, 'searchTable.searchResults', searchResults);
        });
        //\ 

        //Watching Search Result
        app.store.watch(app, 'searchTable.searchResults', 'renderBooksStoreList');
        //\        

        //Render Books Store List
        let books = app.store.get(app, 'booksTable');
        app.renderBooksStoreList(books);
        //\

    }
}

new App();