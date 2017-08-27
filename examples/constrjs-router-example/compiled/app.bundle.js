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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// DOMModule
// ES6+ DOM elements manipulation, constrjs project
// Author Zbigi Man Zbigniew Stępniewski 2017
var DOMModule = exports.DOMModule = function () {
    function DOMModule() {
        _classCallCheck(this, DOMModule);
    }

    _createClass(DOMModule, [{
        key: 'hasClass',

        // addClass, removeClass
        //Thanks to: http://jaketrent.com/post/addremove-classes-raw-javascript/
        value: function hasClass(el, className) {
            if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
        }
    }, {
        key: 'addClass',
        value: function addClass(elements, className) {
            if (elements.length === undefined) {
                elements = [elements];
            }

            elements.forEach(function (el) {
                if (el.classList) el.classList.add(className);else if (!this.hasClass(el, className)) el.className += " " + className;
            });
        }
    }, {
        key: 'removeClass',
        value: function removeClass(elements, className) {

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

    }]);

    return DOMModule;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RouterModule = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // RouterModule
// ES6+ client router, constrjs project
// Author: Zbigi Man Zbigniew Stępniewski 2017


var _constrjsDom = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RouterModule = exports.RouterModule = function () {
    function RouterModule(settings) {
        _classCallCheck(this, RouterModule);

        this.base = settings.base || '/';
        if (settings.SPAEmulation === true) {
            this.SPAEmulationBrowserNavBtns();
            var root = this.base;
            this.base = this.base + '/#';
            if (document.location.href == root + '/') {
                document.location = this.base;
            }
        }
        this.navSelector = settings.navSelector;
        this.error404 = settings.error404 || function () {
            console.error("Error 404\nPage not found.");
        };
        this.routes = [];
        this.DOMModule = new _constrjsDom.DOMModule();
        this.name = settings.name || 'RouterModule';
    }

    _createClass(RouterModule, [{
        key: 'SPAEmulationBrowserNavBtns',
        value: function SPAEmulationBrowserNavBtns() {
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
    }, {
        key: 'add',
        value: function add(routesSets) {
            var that = this;
            routesSets.forEach(function (set) {
                var path = Object.keys(set)[0];
                var callback = set[path];
                that.routes.push({
                    _path: path,
                    _callback: callback
                });
            });
            this.init();
        }
    }, {
        key: 'navigate',
        value: function navigate(_path, e) {
            var that = this,
                pageNotFound = 0,
                x = 0;
            this.routes.forEach(function (route) {
                var routeParts = route._path.split('/').slice(1),
                    pathParts = _path.split('/').slice(1),
                    match = 0,
                    _arguments = {};
                if (routeParts.length == pathParts.length) {
                    x++;
                    routeParts.forEach(function (part, i) {
                        if (/^:[da-z]{0,255}/g.test(part) === true) {
                            var key = part.slice(1);
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
                        var activeLink = document.querySelector('a[data-router-link][href="' + _path + '"');
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
    }, {
        key: 'init',
        value: function init() {
            var path = document.location.href.replace(this.base, '');
            this.navigate(path);
            this.activateRouterLinks(this.navSelector);
        }
    }, {
        key: 'activateRouterLinks',
        value: function activateRouterLinks(navSelector) {
            var routerLinks = document.querySelectorAll(navSelector + ' *[data-router-link]'),
                that = this;
            routerLinks.forEach(function (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    var href = this.getAttribute('href');
                    that.navigate(href, e);
                });
            });
        }
    }]);

    return RouterModule;
}();

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _constrjsRouter = __webpack_require__(1);

var _constrjsDom = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(3);

var App = function App() {
    _classCallCheck(this, App);

    var app = this;

    app.DOMModule = new _constrjsDom.DOMModule();

    //Init Router        
    app.router = new _constrjsRouter.RouterModule({
        base: routerModuleBase,
        navSelector: '#main-router-navbar',
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
            app.mainRouterOutput.innerHTML = 'Home';
        }
    }, {
        '/about': function about() {
            app.mainRouterOutput.innerHTML = 'About';
        }
    }, {
        '/option/:id': function optionId(data) {
            if (data.id != '') {
                app.mainRouterOutput.innerHTML = 'Option ' + data.id;
            } else {
                app.router.navigate('/home');
            }
        }
    }]);
    //\Add routes        
};

new App();

/***/ })
/******/ ]);