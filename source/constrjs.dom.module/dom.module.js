// DOMModule
// ES6+ DOM elements manipulation | constrjs project
// Author Zbigi Man Zbigniew Stępniewski 2017
export class DOMModule {
    // addClass, removeClass
    //Thanks to: http://jaketrent.com/post/addremove-classes-raw-javascript/
    hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className)
        else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }
    addClass(elements, className) {
        if (elements.length === undefined) {
            elements = [elements];
        }

        elements.forEach(function (el) {
            if (el.classList)
                el.classList.add(className)
            else if (!this.hasClass(el, className)) el.className += " " + className
        });
    }
    removeClass(elements, className) {

        if (elements.length === undefined) {
            elements = [elements];
        }

        elements.forEach(function (el) {
            if (el.classList)
                el.classList.remove(className)
            else if (this.hasClass(el, className)) {
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
                el.className = el.className.replace(reg, ' ')
            }
        });
    }
    //\ addClass, removeClass

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