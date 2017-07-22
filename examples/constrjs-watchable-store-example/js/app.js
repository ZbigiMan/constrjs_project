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
                    title: 'Some Book',
                    author: 'Some Author',
                    description: 'About Some Book',
                    price: '$0.11'
                }, {
                    title: 'Other Book',
                    author: 'Other Author',
                    description: 'About Other Book',
                    price: '$0.09'
                }, {
                    title: 'Another Book',
                    author: 'Another Author',
                    description: 'Another Some Book',
                    price: '$0.39'
                }, {
                    title: 'Some Else Book',
                    author: 'Some Else Author',
                    description: 'About Some Else Book',
                    price: '$0.21'
                }],
                searchTable: {
                    searchInput: String,
                    searchResults: Array
                }
            },
            console: true
        });

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
                return (book.title == searchQuery);
            });
            if(searchResults.length===0){
                searchResults = books;
            }
            app.store.set(app, 'searchTable.searchResults', searchResults);
        });
        //\ 

        //Watching Search Result
        app.store.watch(app, 'searchTable.searchResults', 'renderBooksStoreList');
        //\

        //Render Books Store List
        app.renderBooksStoreList = (books) => {
            let booksList = ''
            books.forEach((book) => {
                booksList += `<li>
                    <h2>${book.title}</h2>
                    <h3>${book.author}</h3>
                    <p>${book.description}</p>
                </li>`;
            });
            document.querySelector('.books-store-output').innerHTML = booksList;
        }
        //\

        //Render Books Store List
        let books = app.store.get(app,'booksTable');
        app.renderBooksStoreList(books);
        //\
    }
}

new App();