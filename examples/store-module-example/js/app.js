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

        // Store service
        var storeService = new StoreService();
        //\

        //app shared
        app.shared = {
            store: storeService.store
        }
        //\

        // Components
        app.booksComponent = new BooksComponent(app.shared);
        app.cartComponent = new CartComponent(app.shared);
        app.searchComponent = new SearchComponent(app.shared);
        //\

    }
}

//Starting the App:
new App();