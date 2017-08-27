require("../styles/main.scss");
import 'mdn-polyfills/NodeList.forEach';
import { RouterModule } from '@zbigiman/constrjs.router.module';
import { DOMModule } from '@zbigiman/constrjs.dom.module';

class App {
    constructor() {

        var app = this;

        app.DOMModule = new DOMModule();

        //Init Router        
        app.router = new RouterModule({
            base: routerModuleBase,
            navSelector: '#main-router-navbar',
            error404: () => {
                app.router.navigate('');
            },
            SPAEmulation: true,
        });
        //\Init Router

        //Add routes
        app.router.add([
            {
                '': () => {
                    app.router.navigate('/home');
                }
            },
            {
                '/home': () => {
                    document.querySelector('#main-router-output').innerHTML = 'Home';

                }
            },
            {
                '/about': () => {
                    document.querySelector('#main-router-output').innerHTML = 'About';

                }
            }, {
                '/option': () => {
                    app.router.navigate('/option/1');
                }
            }, {
                '/option/:number': (data) => {
                    document.querySelector('#main-router-output').innerHTML = 'Option ' + data.number;
                }
            }]
        );
        //\Add routes        
    }
}

new App();