require("../styles/main.scss");
//import 'mdn-polyfills/NodeList.forEach';

import { StoreModule } from '@zbigiman/constrjs.store.module';
//import { StoreModule } from '../../../source/constrjs.store.module/store.module';

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
        app.storeService = new StoreService();
        app.store = app.storeService.store;
        //

        // Components
        app.booksComponent = new BooksComponent(app.store);
        app.cartComponent = new CartComponent(app.store);
        app.searchComponent = new SearchComponent(app.store);
        //\
               
    }
}

//Starting the App:
new App();