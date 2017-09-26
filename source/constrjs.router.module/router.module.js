// RouterModule
// ES6+ client router | :{constrjs} project
// Author: Zbigi Man Zbigniew Stępniewski 2017
import { DOMModule } from '@zbigiman/constrjs.dom.module';
//import {DOMModule} from '../../source/constrjs.dom.module/dom.module';

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
        this.navSelector = 'body' || settings.navSelector;
        this.aTagSelector = 'a[data-router-link]' || settings.aTagSelector;
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
                    that.DOMModule.removeClass(document.querySelectorAll(this.navSelector + ' ' + this.aTagSelector), 'active');
                    let activeLink = document.querySelector(this.navSelector + ' '+ this.aTagSelector+'[href="' + _path + '"');

                    let href = _path;
                    while(href.length>0){
                        href = href.slice(0,href.lastIndexOf('/'));
                        if(href!=''){
                            let parent = document.querySelector(this.navSelector + ' ' + this.aTagSelector + '[href="' + href + '"');
                            if(parent!==null){                                
                                that.DOMModule.addClass(parent,'active');
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
        routerLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                let href = this.getAttribute('href');
                that.navigate(href, e);
            });
        });
    }
}