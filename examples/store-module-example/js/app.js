require("../styles/main.scss");
//import 'mdn-polyfills/NodeList.forEach';

import { StoreService } from './store.service/store.service';

import { BooksComponent } from './books.component/books.component';
import { CartComponent } from './cart.component/cart.component';
import { SearchComponent } from './search.component/search.component';

// Creating the App
class App {
    constructor() {

        // App instance:
        var app = this;
        //\

        // Store
        var storeService = new StoreService();    
        //\

        //app settings
        app.settings = {
            store: storeService.store
        }
        //\

        // Components
        app.booksComponent = new BooksComponent(app.settings);
        app.cartComponent = new CartComponent(app.settings);
        app.searchComponent = new SearchComponent(app.settings);
        //\

    }
}

//Starting the App:
new App();