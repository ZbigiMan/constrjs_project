// RouterModule
// ES6+ client router | :{constrjs} project
// Author: Zbigi Man Zbigniew Stępniewski 2017
import { DOMModule } from '@zbigiman/constrjs.dom.module';
//import {DOMModule} from '../../examples/constrjs-router-example/node_modules/@zbigiman/constrjs.dom.module';

export class RouterModule {
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
        this.navSelector = settings.navSelector;
        this.aTagSelector = 'a' || settings.aTagSelector;
        this.error404 = settings.error404 || function () { console.error("Error 404\nPage not found.") };
        this.routes = [];
        this.DOMModule = new DOMModule();
        this.name = settings.name || 'RouterModule';
    }
    SPAEmulationBrowserNavBtns() {
        window.innerDocClick = false;
        document.onmouseover = function () {
            window.innerDocClick = true;
        }
        document.onmouseleave = function () {
            window.innerDocClick = false;
        }
        window.onhashchange = function () {
            if (!window.innerDocClick) {
                location.reload();
            }
        };
    }
    add(routesSets) {
        let that = this;
        routesSets.forEach((set) => {
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
        this.routes.forEach((route) => {
            let routeParts = route._path.split('/').slice(1),
                pathParts = _path.split('/').slice(1),
                match = 0,
                _arguments = {}
            if (routeParts.length == pathParts.length) {
                x++;
                routeParts.forEach((part, i) => {                    
                    if (/^:[da-z]{1,255}/g.test(part) === true && pathParts[i].length>0) {
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
        routerLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let href = this.getAttribute('href');
                that.navigate(href, e);
            });
        });
    }
}