require("../styles/main.scss");
import 'mdn-polyfills/NodeList.forEach';

import { RouterModule } from '@zbigiman/constrjs.router.module';
//import { RouterModule } from '../../../source/constrjs.router.module/router.module';

class App {
    constructor() {
        var app = this;    
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
                    app.mainRouterOutput.innerHTML = `<h1>Home</h1>                    
                    <p>
                    Duis adipisicing velit velit laboris consequat quis sunt ullamco qui nulla cupidatat fugiat officia minim. Proident aute sint Lorem fugiat dolore consequat excepteur duis elit laboris nostrud ad irure. Dolor deserunt esse cillum pariatur fugiat culpa commodo in. Laborum deserunt occaecat ad ipsum anim. Velit amet minim ad sunt aliqua laboris sunt aute.
                    </p>`;

                }
            },
            {
                '/about': () => {
                    app.mainRouterOutput.innerHTML =  `<h1>About</h1>                    
                    <p>
                    In sint sunt amet cillum in dolore est. Id adipisicing mollit cillum duis eiusmod aute. Deserunt sit consequat ad dolor minim sit enim fugiat cupidatat proident ea adipisicing ea occaecat.
                    </p>`;

                }
            }, {
                '/option/:id': (data) => {            
                    app.mainRouterOutput.innerHTML =  `<h1>Option ${data.id}</h1>                    
                    <p>
                    Mollit excepteur voluptate aute velit dolor ad. Proident labore reprehenderit sit aute. Officia cillum aute veniam proident irure aliquip elit elit quis ad excepteur do et nisi.
                    </p>`;                                       
                }
            }]
        );
        //\Add routes        
    }
}

new App();