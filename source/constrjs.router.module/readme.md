### ES6+ client router | constrjs project

## Introduction:

### Why?

The **constrjs** project was started in my head during searching for new job. I had to do some test task - create simple web app without using any JS framework or lib like Angular or ReactJS. I wrote some simple ES6 code which I started to improve - I didn't get that job... 

### What is the contrjs project?

This is the bundle of ES6 modules/classes helping to create JS SPA app:

* **RouterModule** - client router
* **StoreModule** - watchable app store
* **DOMModule** - DOM elemets manipulation

# RouterModule
### Instalation:

```
$ npm i @zbigiman/constrjs.router.module
```

## Usage:

### Import:

```javascript
import { RouterModule } from '@zbigiman/constrjs.router.module'
```

### Router Base

```javascript
var url = document.location.href;
var routerModuleRoot
if (url.indexOf('localhost') != -1 || url.indexOf('127.0.0.1') != -1) {
    routerModuleBase = 'http://localhost:8000';
} else {
    //routerModuleBase = 'http://your_project_url_base;
}
```

### Init router:

```javascript
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

        /*
        ...
        */
    }
    /*
    ...
    */
}
```
### Add routes
```javascript
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
```
#### Use at your own risk