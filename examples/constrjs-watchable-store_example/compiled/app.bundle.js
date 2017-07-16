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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _template() {return `<section class="login">
    <div class="container container--fullscreen container__login-bg">
        <div class="content content--vertival-center content__login">
            <h1 class="--text-center">Login</h1>
            <div class="hr hr__login --hide-xs"></div>
            <div class="form-field">
                <input id="email" name="name" type="email" placeholder="Email" required>
                <label for="email">Email</label>
            </div>
            <div class="hr hr__login"></div>
            <div class="form-field">
                <input id="password" name="password" type="password" placeholder="Password" required>
                <label for="password">Password</label>
            </div>
            <div class="hr hr__login"></div>
            <div class="dsc --text-center">
                By signing up or clicking continue, I confirm that I have read and agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
            </div>
            <button id="login-button" class="btn btn--primary btn--wide btn__login-button">Login</button>
        </div>
    </div>
</section>`;}/* harmony default export */ __webpack_exports__["default"] = (function (ctx) {return _template.call(ctx, ctx);});;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _template() {return `<section class="subpage subpage__aubout">
    <!-- Mobile content -->
    <form class="form form--subpage form__change-first-name --visible-xs">
        <div class="row row--flex row__title">
            <h1 class="flex-item">Profile info</h1>
            <div class="flex-tem flex-item__buttons --visible-xs">
                <button type="button" class="btn btn--primary btn--secondary btn--secondary-mobile">Cancel</button>
                <button type="button" class="btn btn--primary btn--secondary btn--secondary-mobile">Save</button>
            </div>
        </div>
        <div class="form-field">
            <input type="text" name="first-name" id="first-name" placeholder="First Name">
            <label for="first-name">First Name</label>
        </div>
        <div class="form-field">
            <input type="text" name="last-name" id="last-name" placeholder="Last Name">
            <label for="last-name">Last Name</label>
        </div>
        <div class="form-field">
            <input type="text" name="website" id="website" placeholder="Website">
            <label for="website">Website</label>
        </div>
        <div class="form-field">
            <input type="text" name="phone" id="phone" placeholder="Phone Number">
            <label for="phone">Phone Number</label>
        </div>
        <div class="form-field">
            <input type="text" name="address" id="address" placeholder="City, State &amp; ZIP">
            <label for="address">City, State &amp; ZIP</label>
        </div>
        <button type="button" class="btn btn--primary btn--secondary --hide-xs">Save</button>
    </form>
    <!-- Desktop content -->
    <div class="about__desktop --hide-xs">
        <div class="row__title">
            <h1>Profile info</h1>
        </div>
        <div class="row row__profile-info --hide-xs">
            <div class="row row--flex row__name">
                <span class="flex-item value">Jesica Parker</span>
                <button class="flex-item btn btn--tool btn__edit" data-target="row__name">
                    <i class="icon ion-edit"></i>                
                </button>
                <!-- pop up -->
                <div class="flex-item popup-edit popup-edit__name --hidden-alpha">
                    <div class="content content--popup">
                        <form class="form--subpage">
                            <div class="form-field">
                                <input type="text" name="name" id="name" placeholder="First Name">
                                <label for="name">First Name</label>
                            </div>
                            <button type="button" class="btn btn--primary btn--secondary">Save</button>
                            <button type="button" class="btn btn--outline btn--outline-blue btn--primary btn--secondary btn__cancel">Cancel</button>
                        </form>
                    </div>
                </div>
                <!-- /pop up -->
            </div>
            <div class="row row--flex row__www">
                <i class="flex-item icon ion-earth"></i>
                <span class="flex-item value">www.seller.com</span>
                <button class="flex-item btn btn--tool btn__edit" data-target="row__www">
                <i class="icon ion-edit"></i>
            </button>
            <!-- pop up -->
                <div class="flex-item popup-edit popup-edit__website --hidden-alpha">
                    <div class="content content--popup">
                        <form class="form--subpage">
                            <div class="form-field">
                                <input type="text" name="website" id="website" placeholder="Website">
                                <label for="website">Website</label>
                            </div>
                            <button type="button" class="btn btn--primary btn--secondary">Save</button>
                            <button type="button" class="btn btn--outline btn--outline-blue btn--primary btn--secondary btn__cancel">Cancel</button>
                        </form>
                    </div>
                </div>
                <!-- /pop up -->
            </div>
            <div class="row row--flex row__phone">
                <i class="flex-item icon ion-ios-telephone-outline"></i>
                <span class="flex-item value">(949) 325 - 68594</span>
                <button class="flex-item btn btn--tool btn__edit" data-target="row__phone">
                <i class="icon ion-edit"></i>
            </button>
            <!-- pop up -->
                <div class="flex-item popup-edit popup-edit__phone --hidden-alpha">
                    <div class="content content--popup">
                        <form class="form--subpage">
                            <div class="form-field">
                                <input type="text" name="phone" id="phone" placeholder="Phone Number">
                                <label for="phone">Phone Number</label>
                            </div>
                            <button type="button" class="btn btn--primary btn--secondary">Save</button>
                            <button type="button" class="btn btn--outline btn--outline-blue btn--primary btn--secondary btn__cancel">Cancel</button>
                        </form>
                    </div>
                </div>
                <!-- /pop up -->
            </div>
            <div class="row row--flex row__address">
                <i class="flex-item icon ion-ios-home-outline"></i>
                <span class="flex-item value">Newport Beach, CA</span>
                <button class="flex-item btn btn--tool btn__edit" data-target="row__address">
                <i class="icon ion-edit"></i>
            </button>
            <!-- pop up -->
                <div class="flex-item popup-edit popup-edit__address --hidden-alpha">
                    <div class="content content--popup">
                        <form class="form--subpage">
                            <div class="form-field">
                                <input type="text" name="address" id="address" placeholder="City, State &amp; ZIP">
                                <label for="address">City, State &amp; ZIP</label>
                            </div>
                            <button type="button" class="btn btn--primary btn--secondary">Save</button>
                            <button type="button" class="btn btn--outline btn--outline-blue btn--primary btn--secondary btn__cancel">Cancel</button>
                        </form>
                    </div>
                </div>
                <!-- /pop up -->
            </div>
        </div>
    </div>
</section>`;}/* harmony default export */ __webpack_exports__["default"] = (function (ctx) {return _template.call(ctx, ctx);});;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _template() {return `<section class="subpage subpage__settings">
    <form class="form form--subpage form__change-password">
        <div class="row row--flex row__title">
            <h1 class="flex-item">Settings</h1>
            <div class="flex-tem flex-item__buttons --visible-xs">
                <button type="button" class="btn btn--primary btn--secondary btn--secondary-mobile">Cancel</button>
                <button type="button" class="btn btn--primary btn--secondary btn--secondary-mobile">Save</button>
            </div>
        </div>        
        <div class="form-field">
            <input type="password" name="existing-password" id="existing-password" placeholder="Existing Password">
            <label for="existing-password">Existing Password</label>
        </div>
        <div class="form-field">
            <input type="password" name="new-password" id="new-password" placeholder="New Password">
            <label for="new-password">Existing Password</label>
        </div>
        <div class="form-field">
            <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password">
            <label for="confirm-password">Confirm Password</label>
        </div>
        <button type="button" class="btn btn--primary btn--secondary --hide-xs">Save</button>
    </form>
</section>`;}/* harmony default export */ __webpack_exports__["default"] = (function (ctx) {return _template.call(ctx, ctx);});;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _template() {return `<section class="profile">
    <header class="container container__header">
        <div class="content">
            <div class="row --text-right row__logout">
                <button type="button" class="btn btn--outline btn--outline-blue btn--secondary btn--secondary-bold btn--outline-blue__logout">Log out</button>
            </div>
            <div class="row --text-center row__upload-cover-img">
                <button class="btn btn--outline btn--with-icon btn--outline__upload-cover-img">
                    <i class="icon ion-android-camera"></i> <span class="text">Upload Cover Image</span>
                </button>
            </div>
            <div class="row row--flex row__profile-image-and-info">
                <div class="col col__profile-image">
                    <div class="profile-img-continer">
                        <div class="profile-img-continer profile-img-continer__image"></div>
                    </div>
                </div>
                <div class="col col__profile-info">
                    <div class="row row__profile-info">
                        <h2 class="flex-item name">
                            <span class="value">Jessica Parker</span>
                        </h2>
                        <h4 class="flex-item address"><i class="icon ion-ios-location-outline"></i>
                            <span class="value">Newport Beach, CA</span>
                        </h4>
                        <h4 class="flex-item phone"><i class="icon ion-ios-telephone-outline"></i>
                            <span class="value">(949) 325 - 68594</span>
                        </h4>
                    </div>
                </div>
                <div class="col col__reviews">
                    <div class="row">
                        <span class="stars">
                            <i class="ion-android-star"></i>
                            <i class="ion-android-star"></i>
                            <i class="ion-android-star"></i>
                            <i class="ion-android-star"></i>
                            <i class="ion-android-star-outline"></i>
                        </span><br class="--visible-xs" />
                        <span class="reviews-count">6</span>
                        <span class="reviews">Reviews</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="container container--shadow container__profile-navbar" id="profile-nav">
        <div class="row row--flex">
            <div class="col col__navbar">
                <nav class="navbar navbar__profile">
                    <div class="shadow-left"></div>
                    <ul class="navbar-content content content__profile-navbar">
                        <li class="navbar-item"><a data-router-link href="/profile/about">About</a></li>
                        <li class="navbar-item"><a data-router-link href="/profile/settings">Settings</a></li>
                        <li class="navbar-item"><a data-router-link href="/profile/option1">Option 1</a></li>
                        <li class="navbar-item"><a data-router-link href="/profile/option2">Option 2</a></li>
                        <li class="navbar-item"><a data-router-link href="/profile/option3">Option 3</a></li>
                    </ul>
                    <div class="shadow-right --visible-xs"></div>
                </nav>
            </div>
            <div class="col col__followers">
                <div class="content content__followers">
                    <div class="row row--flex">
                        <span class="flex-item __followers-plus"><i class="icon ion-ios-plus"></i></span>
                        <span class="flex-item __folowers-count">15</span>
                        <span class="flex-item __folowers">Followers</span>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <main class="container container--shadow container--subpage">
        <div id="profile-route-output" class="content content--subpage"></div>
    </main>
</section>`;}/* harmony default export */ __webpack_exports__["default"] = (function (ctx) {return _template.call(ctx, ctx);});;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(2);

var _constrjsRouter = __webpack_require__(1);

var _constrjsDom = __webpack_require__(0);

var _login = __webpack_require__(3);

var _login2 = _interopRequireDefault(_login);

var _profile = __webpack_require__(6);

var _profile2 = _interopRequireDefault(_profile);

var _profileAbout = __webpack_require__(4);

var _profileAbout2 = _interopRequireDefault(_profileAbout);

var _profileSettings = __webpack_require__(5);

var _profileSettings2 = _interopRequireDefault(_profileSettings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(7);

var App = function () {
    function App() {
        var _this = this;

        _classCallCheck(this, App);

        this.DOMModule = new _constrjsDom.DOMModule();
        //Init Router        
        this.router = new _constrjsRouter.RouterModule({
            base: routerModuleBase,
            SPAEmulation: true,
            error404: function error404() {
                _this.router.navigate('');
            }
        });
        //\Init Router

        //Add routes
        this.router.add([{
            '': function _() {
                _this.router.navigate('/login');
            }
        }, {
            '/login': function login() {
                document.querySelector('#main-router-output').innerHTML = (0, _login2.default)();
                var loginButton = document.querySelector('#login-button');
                var that = _this;
                loginButton.addEventListener("click", function () {
                    //TO DO
                    //LOGIN FORM VALIDATION !!!
                    that.router.navigate('/profile/about');
                });
            }
        }, {
            '/profile': function profile() {
                _this.router.navigate('/profile/about');
            }
        }, {
            '/profile/:route': function profileRoute(data) {
                if (document.querySelector('#profile-nav') === null) {
                    document.querySelector('#main-router-output').innerHTML = (0, _profile2.default)();
                    _this.router.activateRouterLinks('#profile-nav');
                    _this.swapMenu();
                    var btnLogout = document.querySelector('.btn--outline-blue__logout');
                    var that = _this;
                    btnLogout.addEventListener('click', function () {
                        that.router.navigate('/login');
                    });
                }
                var profileRouteOutput = document.querySelector('#profile-route-output');
                switch (data.route) {
                    case 'about':
                        profileRouteOutput.innerHTML = (0, _profileAbout2.default)();

                        var btnsEdit = document.querySelectorAll('.about__desktop .btn__edit');

                        btnsEdit.forEach(function (btnEdit) {
                            var popups = document.querySelectorAll('.about__desktop .popup-edit');
                            var that = _this;
                            btnEdit.addEventListener('click', function () {
                                that.DOMModule.addClass(popups, '--hidden-alpha');
                                var target = this.getAttribute('data-target');
                                var popup = document.querySelector('.about__desktop .' + target + ' .popup-edit');
                                var btnCancel = popup.querySelector('.btn__cancel');
                                that.DOMModule.removeClass(popup, '--hidden-alpha');
                                (function () {
                                    btnCancel.addEventListener('click', function () {
                                        that.DOMModule.addClass(popup, '--hidden-alpha');
                                    });
                                })(popup);
                            });
                        });

                        break;
                    case 'settings':
                        profileRouteOutput.innerHTML = (0, _profileSettings2.default)();
                        break;
                    default:
                        profileRouteOutput.innerHTML = '\n                            <section class="subpage subpage__settings">\n                                <h1>' + data.route + '</h1>\n                            </section>';

                }
            }
        }]);
        //\Add routes        
    }

    _createClass(App, [{
        key: 'swapMenu',
        value: function swapMenu() {
            var menu = document.querySelector('.navbar');
            var menuWidth = menu.offsetWidth;
            var menuContent = menu.querySelector('.navbar-content');
            var menuContentWidth = menuContent.offsetWidth;
            var startX = void 0;
            menu.addEventListener('touchstart', function () {
                var rect = menu.getBoundingClientRect();
                startX = event.touches[0].clientX - rect.left;
            });
            menu.addEventListener('touchmove', function () {
                var rect = menu.getBoundingClientRect();
                var x = event.touches[0].clientX - rect.left;
                var menuContentX = x - startX;
                var menuContentMinX = menuWidth - menuContentWidth;
                if (menuContentX > 0) {
                    menuContentX = 0;
                }
                if (menuContentX < menuContentMinX) {
                    menuContentX = menuContentMinX;
                }
                menuContent.style.left = menuContentX + 'px';
            });
            window.addEventListener('resize', function () {
                menuContent.style.left = '0px';
            });
        }
    }]);

    return App;
}();

var app = new App();

/***/ })
/******/ ]);