
require("../styles/main.scss");
import 'mdn-polyfills/NodeList.forEach';

import { StoreModule } from '../../../source/constrjs.store.module/store.module';


import { RouterModule } from '@zbigiman/constrjs.router.module';
import { DOMModule } from '@zbigiman/constrjs.dom.module';
import loginTemplate from '../templates/login.html';
import profileTemplate from '../templates/profile.html';
import profileAboutTemplate from '../templates/profile-about.html';
import profileSettingsTemplate from '../templates/profile-settings.html';

class App {
    constructor() {

        var app = this;

        app.store = new StoreModule({
            store: {
                searchTable: {
                    searchInput: String,
                    searchResults: Object
                }
            }
        });

        app.store.set(app, 'searchTable.searchInput', 'test');

        app.store.watch(app,'searchTable.searchInput',() =>{
            console.log('watch');
        });

        console.log(app.store.getAll());

    }    
}

var app = new App();