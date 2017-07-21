
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
                searchTable: {
                    searchInput: String,
                    searchResults: Object
                }
            },
            console: false
        });

        app.store.watch(app, 'searchTable.searchInput', (data) => {
            console.log('data', data);
        });

        app.store.set(app, 'searchTable.searchInput', 'test');

        console.log(document.querySelector('#search'));

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
            }else{
                app.DOMModule.removeClass(searchBar, 'search-bar--visible');
                app.DOMModule.removeClass(document.body, 'search-bar--visible');
            }


        });
    }
}

new App();