
require("../styles/main.scss");
import 'mdn-polyfills/NodeList.forEach';

import { DOMModule } from '@zbigiman/constrjs.dom.module';
import { StoreModule } from '@zbigiman/constrjs.store.module';
import { RouterModule } from '@zbigiman/constrjs.router.module';

class App {
    constructor() {

        var app = this;

        app.DOMModule = new DOMModule();

        app.store = new StoreModule({
            store: {
                booksStoreTable: [{
                    title: 'Some Book',
                    'Author': 'Some Author',
                    description: 'About Some Book',
                    price: '$0.11'
                }, {
                    title: 'Other Book',
                    'Author': 'Other Author',
                    description: 'About Other Book',
                    price: '$0.09'
                }, {
                    title: 'Another Book',
                    'Author': 'Another Author',
                    description: 'Another Some Book',
                    price: '$0.39'
                }, {
                    title: 'Some Else Book',
                    'Author': 'Some Else Author',
                    description: 'About Some Else Book',
                    price: '$0.21'
                }],
                searchTable: {
                    searchInput: String,
                    searchResults: Array
                }
            },
            console: false
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
        app.store.watch(app,'searchTable.searchInput',(searchQuery)=>{
            let books = app.store.get(app,'booksStoreTable');
            let searchResults = books.filter(title => title = 'Some Book');
            console.log(searchResults);
        });

        //\                
    }
}

new App();