### ES6+ DOM elements manipulation

## Introduction:

### Why?

The **constrjs** project was started in my head during searching for new job. I had to do some test task - create simple web app without using any JS framework or lib like Angular or ReactJS. I wrote some simple ES6 code which I started to improve - I didn't get that job... 

### What is the contrjs project?

This is the bundle of ES6 modules/classes helping to create JS SPA app:

* **RouterModule** - client router
* **StoreModule** - watchable app store
* **DOMModule** - DOM elemets manipulation

# DOMModule
### Instalation:

```
$ npm i @zbigiman/constrjs.dom.module
```

## Usage:

### Import:

```javascript
import { DOMMModule } from '@zbigiman/constrjs.dom.module';

this.DOMModule = new DOMModule();
```

### Methods

#### addClass
```javascript
let activeLink =  let activeLink = document.querySelector('a[data-router-link][href="' + _path + '"');
                   
this.DOMModule.addClass(activeLink, 'active');
```

#### removeClass
```javascript
 this.DOMModule.removeClass(document.querySelectorAll('a[data-router-link]'), 'active');
```

#### getParents
```javascript
    var el = document.querySelector('target');
    var parents = this.DOMModule.getParents(el);
```
returns array of all parents.

#### Use at your own risk