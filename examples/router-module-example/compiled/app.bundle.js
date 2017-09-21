/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


!function () {
  "use strict";
  var t = function t(_t, o) {
    o = o || window;for (var i = 0; i < this.length; i++) {
      _t.call(o, this[i], i, this);
    }
  };window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = t);
}();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__source_constrjs_dom_module_dom_module__ = __webpack_require__(9);
// RouterModule
// ES6+ client router | :{constrjs} project
// Author: Zbigi Man Zbigniew Stępniewski 2017
//import { DOMModule } from '@zbigiman/constrjs.dom.module';


class RouterModule {
    constructor(settings) {
        this.base = settings.base || '/';
        if (settings.SPAEmulation === true) {
            this.SPAEmulationBrowserNavBtns();
            let root = this.base;
            this.base = this.base + '/#';
            if (document.location.href == root + '/') {
                document.location = this.base;
            }
        }
        this.navSelector = 'body' || settings.navSelector;
        this.aTagSelector = 'a' || settings.aTagSelector;
        this.error404 = settings.error404 || function () {
            console.error("Error 404\nPage not found.");
        };
        this.routes = [];
        this.DOMModule = new __WEBPACK_IMPORTED_MODULE_0__source_constrjs_dom_module_dom_module__["a" /* DOMModule */]();
        this.name = settings.name || 'RouterModule';
    }
    SPAEmulationBrowserNavBtns() {
        window.innerDocClick = false;
        document.onmouseover = function () {
            window.innerDocClick = true;
        };
        document.onmouseleave = function () {
            window.innerDocClick = false;
        };
        window.onhashchange = function () {
            if (!window.innerDocClick) {
                location.reload();
            }
        };
    }
    add(routesSets) {
        let that = this;
        routesSets.forEach(set => {
            let path = Object.keys(set)[0];
            let callback = set[path];
            that.routes.push({
                _path: path,
                _callback: callback
            });
        });
        this.init();
    }
    navigate(_path, e) {
        let that = this,
            pageNotFound = 0,
            x = 0;
        this.routes.forEach(route => {
            let routeParts = route._path.split('/').slice(1),
                pathParts = _path.split('/').slice(1),
                match = 0,
                _arguments = {};
            if (routeParts.length == pathParts.length) {
                x++;
                routeParts.forEach((part, i) => {
                    if (/^:[da-z]{1,255}/g.test(part) === true && pathParts[i].length > 0) {
                        let key = part.slice(1);
                        _arguments[key] = pathParts[i];
                        match++;
                    } else if (part == pathParts[i]) {
                        match++;
                    }
                });
                if (match == routeParts.length && match !== 0 || _path == '') {
                    history.pushState(null, null, that.base + _path);
                    route._callback(_arguments, e);
                    that.DOMModule.removeClass(document.querySelectorAll('a[data-router-link]'), 'active');
                    let activeLink = document.querySelector('a[data-router-link][href="' + _path + '"');

                    let href = _path;
                    while (href.length > 0) {
                        href = href.slice(0, href.lastIndexOf('/'));
                        if (href != '') {
                            let parent = document.querySelector('a[data-router-link][href="' + href + '"');
                            if (parent !== null) {
                                that.DOMModule.addClass(parent, 'active');
                            }
                        }
                    }

                    if (activeLink !== null) {
                        that.DOMModule.addClass(activeLink, 'active');
                    }
                } else {
                    pageNotFound++;
                }
            }
        });
        if (pageNotFound == x) {
            that.error404();
            return false;
        }
    }
    init() {
        let path = document.location.href.replace(this.base, '');
        this.navigate(path);
        this.activateRouterLinks(this.navSelector);
    }
    activateRouterLinks(navSelector) {
        let routerLinks = document.querySelectorAll(navSelector + ' ' + this.aTagSelector),
            that = this;
        routerLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let href = this.getAttribute('href');
                that.navigate(href, e);
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["RouterModule"] = RouterModule;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var _router = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(2);

// import { RouterModule } from '@zbigiman/constrjs.router.module';

var App = function App() {
    _classCallCheck(this, App);

    var app = this;
    //Init Router        
    app.router = new _router.RouterModule({
        base: routerModuleBase,
        error404: function error404() {
            app.router.navigate('');
        },
        SPAEmulation: true
    });
    //\Init Router

    app.mainRouterOutput = document.querySelector('#main-router-output');

    //Add routes
    app.router.add([{
        '': function _() {
            app.router.navigate('/home');
        }
    }, {
        '/home': function home() {
            app.mainRouterOutput.innerHTML = '<h1>Home</h1>                    \n                    <p>\n                    Duis adipisicing velit velit laboris consequat quis sunt ullamco qui nulla cupidatat fugiat officia minim. Proident aute sint Lorem fugiat dolore consequat excepteur duis elit laboris nostrud ad irure. Dolor deserunt esse cillum pariatur fugiat culpa commodo in. Laborum deserunt occaecat ad ipsum anim. Velit amet minim ad sunt aliqua laboris sunt aute.\n                    </p>';
        }
    }, {
        '/about': function about() {
            app.mainRouterOutput.innerHTML = '<h1>About</h1>                    \n                    <p>\n                    In sint sunt amet cillum in dolore est. Id adipisicing mollit cillum duis eiusmod aute. Deserunt sit consequat ad dolor minim sit enim fugiat cupidatat proident ea adipisicing ea occaecat.\n                    </p>';
        }
    }, {
        '/about/:option': function aboutOption(data) {
            app.mainRouterOutput.innerHTML = '<h1>About ' + data.option + '</h1>                    \n                    <p>\n                    Velit id aliqua labore nisi ipsum amet. Aute laboris in ut velit cupidatat nisi culpa duis adipisicing fugiat. Ex nulla ea ipsum consequat dolor pariatur. Ullamco eiusmod quis sunt ut duis qui. Ut anim excepteur amet quis sit laboris minim quis. Do minim id dolor voluptate sint mollit irure minim consequat.\n                    </p>';
        }
    }, {
        '/option/:id': function optionId(data) {
            app.mainRouterOutput.innerHTML = '<h1>Option ' + data.id + '</h1>                    \n                    <p>\n                    Mollit excepteur voluptate aute velit dolor ad. Proident labore reprehenderit sit aute. Officia cillum aute veniam proident irure aliquip elit elit quis ad excepteur do et nisi.\n                    </p>';
        }
    }]);
    //\Add routes        
};

new App();

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// DOMModule
// ES6+ DOM elements manipulation | constrjs project
// Author Zbigi Man Zbigniew Stępniewski 2017
class DOMModule {
    // addClass, removeClass
    //Thanks to: http://jaketrent.com/post/addremove-classes-raw-javascript/
    hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    addClass(elements, className) {
        if (elements.length === undefined) {
            elements = [elements];
        }

        elements.forEach(function (el) {
            if (el.classList) el.classList.add(className);else if (!this.hasClass(el, className)) el.className += " " + className;
        });
    }
    removeClass(elements, className) {

        if (elements.length === undefined) {
            elements = [elements];
        }

        elements.forEach(function (el) {
            if (el.classList) el.classList.remove(className);else if (this.hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                el.className = el.className.replace(reg, ' ');
            }
        });
    }
    //\ addClass, removeClass

    // Get parents
    getParents(el) {
        let parents = [];
        while (el) {
            parents.unshift(el);
            el = el.parentNode;
        }
        return parents;
    }
    //\

    // Refresh
    refresh(elements) {
        if (elements.length === undefined) {
            elements = [elements];
        }
        elements.forEach(function (el) {
            el.innerHTML = el.innerHTML;
        });
    }
    //\

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DOMModule;


/***/ })
/******/ ]);