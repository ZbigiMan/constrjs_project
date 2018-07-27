### ES6+ watchable store | constrjs project
# Idea: 
### One watchable source of truth = controlled app flow  
I know we have rxjs, observables, promises... but why do not simplify it? Just create immutable data object and watch changes of it?

## Introduction:

### Why?

The **constrjs** project was started in my head during searching for new job. I had to do some test task - create simple web app without using any JS framework or lib like Angular or ReactJS. I wrote some simple ES6 code which I started to improve - I didn't get that job... 

### What is the contrjs project?

This is the bundle of ES6 modules/classes helping to create JS SPA app:

* **RouterModule** - client router
* **StoreModule** - watchable app store
* **DOMModule** - DOM elemets manipulation

# StoreModule
### Instalation:

```
$ npm i @zbigiman/constrjs.store.module
```

## Usage:

### Import:

```javascript
import { StoreModule } from '@zbigiman/constrjs.store.module'
```

### Creating app store:

```javascript
class App {
    constructor() {
        var app = this;
        app.store = new StoreModule({
            store: {
                booksTable: [{
                    id: 1,
                    title: 'Some Book',
                    author: 'Some Author',
                    description: 'About Some Book',
                    price: '$0.11'
                }, {
                    id: 2,
                    title: 'Other Book',
                    author: 'Other Author',
                    description: 'About Other Book',
                    price: '$0.09'
                }, {
                    id: 3,
                    title: 'Another Book',
                    author: 'Another Author',
                    description: 'Another Some Book',
                    price: '$0.39'
                }, {
                    id: 4,
                    title: 'Some Else Book',
                    author: 'Some Else Author',
                    description: 'About Some Else Book',
                    price: '$0.21'
                }],
                cartTable: new Array(),
                searchTable: {
                    searchInput: String,
                    searchResults: new Array()
                }
            },
            console: true
        });
        /*
        ...
        */
    }
    /*
    ...
    */
}
```

## Methods:

### Get 

```javascript
// app.store.Get(caller, table)
let books = app.store.Get(app, 'booksTable');
```

### Set
```javascript
// app.store.Set(caller, table , value)
app.store.Set(app, 'searchTable.searchInput', event.target.value);
```

### Push
```javascript
 // app.store.Push(caller, table, value)
app.store.Push(app, 'cartTable', selectedBook);
```

### Remove
```javascript
// app.store.Remove(caller, table, value)
app.store.Remove(app, 'cartTable', selectedBook);
```

### Watch
#### example 1:
```javascript
// app.store.Watch(caller, table , function*)
// *function name: string || function(data){ ... }
app.store.Watch(app, 'booksTable', 'renderBooksStoreList');
app.renderBooksStoreList = (data) => {
    let books = data.value;
    /*
    ...
    */
}
```
#### example 2:
```javascript
// app.store.Watch(caller, table , function*)
// *function name: string || function(data){ ... }
app.store.Watch(app, 'searchTable.searchInput', (data) => {
    let searchQuery = data.value;
    /*
    ...
    */
});
```

## StoreModule Code Example:

```
$ git clone https://github.com/ZbigiMan/constrjs_project.git
$ cd examples/store-module-example
$ npm i
$ npm start
```
### See more here: https://github.com/ZbigiMan/constrjs_project 
#### Use at your own risk