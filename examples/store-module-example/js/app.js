require("../styles/main.scss");
//import 'mdn-polyfills/NodeList.forEach';

import { DOMModule } from '@zbigiman/constrjs.dom.module';
import { StoreModule } from '@zbigiman/constrjs.store.module';
//import { StoreModule } from '../../../source/constrjs.store.module/store.module';

import { BooksComponent } from './books.component/books.component';

// Creating the App
class App {
    constructor() {

        // App instance:
        var app = this;
        //\

        // DOModule instance - DOM elements manipulation methods:
        app.DOMModule = new DOMModule();
        //\

        // *** Creating app store: StoreModule instance ***       
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
            console: false// show/hide StoreModule logs
        });
        //\

        // Components

        app.booksComponent = new BooksComponent(app);

        //\

        // App methods:

        // Render Cart List:
        app.renderCartList = (data) => {
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
            cartOutput.addEventListener('click', app.btnRemoveFromCartClick);
            //\
        }
        //\

        // "Remove from Cart" button event delegation:
        app.btnRemoveFromCartClick = (event) => {
            if (event.target.className.indexOf('btn__remove-from-cart') != -1) {
                let bookId = event.target.getAttribute('data-book-id');
                app.removeFromCart(bookId);
            }
        }
        //\

        

        //Remove from Cart Function:
        app.removeFromCart = (bookId) => {

            // *** StoreModule get ***
            // app.store.get(caller, table)
            let books = app.store.get(app, 'cartTable');
            //\

            let selectedBook = books.filter((book) => {
                return book.id == bookId;
            })[0];

            // *** StoreModule remove ***
            // app.store.remove(caller, table, value)
            app.store.remove(app, 'cartTable', selectedBook);
            //\

            // *** StoreModule push ***
            // app.store.push(caller, table, value)
            app.store.push(app, 'booksTable', selectedBook);
            //\
        }
        //\

        // Watching booksTable:

        // *** StoreModule watch ***
        // app.store.watch(caller, table , function*)
        // *function name: string || function(data){}
       app.store.watch(app.booksComponent, 'booksTable', 'renderBooksList');

        //\

        //Watching cartTable:

        // *** StoreModule watch ***
        // app.store.watch(caller, table , function*)
        // *function name: string || function() 
        app.store.watch(app, 'cartTable', 'renderCartList');
        //\        


        //Show Search Bar:
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

        //Search function:

        //Search Input event listener:
        document.querySelector('#searchInput').addEventListener('keyup', (event) => {

            // *** StoreModule set ***
            // app.store.set(caller, table , value)
            app.store.set(app, 'searchTable.searchInput', event.target.value);
            //\

        });

        //Watching Search Input:

        // *** StoreModule watch ***
        // app.store.watch(caller, table , function*)
        // *function name: string || function(data) 
        app.store.watch(app, 'searchTable.searchInput', (data) => {
            let searchQuery = data.value;
            // *** StoreModule get ***
            // app.store.get(caller, table)
            let books = app.store.get(app, 'booksTable');
            //\

            let searchResults = books.filter((book) => {
                if (book.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
                    return book.title;
            });
            if (searchResults.length === 0) {
                searchResults = books;
            }

            // *** StoreModule set ***
            // app.store.set(caller, table , value)
            app.store.set(app, 'searchTable.searchResults', searchResults);
            //\

        });
        //\ 

        //Watching Search Result:

        // *** StoreModule watch ***
        // app.store.watch(caller, table , function*)
        // *function name: string || function() 
        app.store.watch(app.booksComponent, 'searchTable.searchResults', 'renderBooksList');
        //\      

        // Initial functions:

        // Render Books Store List:

        // *** StoreModule get ***
        // app.store.get(caller, table)
        let booksTable = app.store.get(app, 'booksTable');
        app.booksComponent.renderBooksList({
            value: booksTable
        });
        //\

        // Render Cart List:

        // *** StoreModule get ***
        // app.store.get(caller, table)
        let cartTable = app.store.get(app, 'cartTable');
        app.renderCartList({
            value: cartTable
        });
        //\

    }
}

//Starting the App:
new App();