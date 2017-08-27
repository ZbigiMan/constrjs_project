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

        app.mainRouterOutput = document.querySelector('#main-router-output');

        //Add routes
        app.router.add([
            {
                '': () => {
                    app.router.navigate('/home');
                }
            },
            {
                '/home': () => {
                    app.mainRouterOutput.innerHTML = 'Home';

                }
            },
            {
                '/about': () => {
                    app.mainRouterOutput.innerHTML = 'About';

                }
            }, {
                '/option/:id': (data) => {
                    if(data.id!=''){
                        app.mainRouterOutput.innerHTML = 'Option ' + data.id;
                    }else{
                        app.router.navigate('/home');
                    }                    
                }
            }]
        );
        //\Add routes        
    }
}

new App();