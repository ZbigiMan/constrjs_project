require("../styles/main.scss");
//import 'mdn-polyfills/NodeList.forEach';

import { DOMModule } from '@zbigiman/constrjs.dom.module';
import { StoreModule } from '@zbigiman/constrjs.store.module';
//import { StoreModule } from '../../../source/constrjs.store.module/store.module';

import { StoreService } from './store.service/store.service';

import { BooksComponent } from './books.component/books.component';
import { CartComponent } from './cart.component/cart.component';

// Creating the App
class App {
    constructor() {

        // App instance:
        var app = this;
        //\

        // Store
        app.storeService = new StoreService();
        app.store = app.storeService.store;
        //

        // Components

        app.booksComponent = new BooksComponent(app.store);
        app.cartComponent = new CartComponent(app.store);
        //\
        
        app.DOMModule = new DOMModule();
    

       
       

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
    }
}

//Starting the App:
new App();