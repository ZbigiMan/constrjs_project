require("../styles/main.scss");
import 'mdn-polyfills/NodeList.forEach';
import { RouterModule } from '@zbigiman/constrjs.router.module';
import { DOMModule } from '@zbigiman/constrjs.dom.module';
import loginTemplate from '../templates/login.html';
import profileTemplate from '../templates/profile.html';
import profileAboutTemplate from '../templates/profile-about.html';
import profileSettingsTemplate from '../templates/profile-settings.html';

class App {
    constructor() {

        var app = this;

        app.DOMModule = new DOMModule();

        //Init Router        
        app.router = new RouterModule({
            base: routerModuleBase,
            SPAEmulation: true,
            error404: () => {
                app.router.navigate('');
            }
        });
        //\Init Router

        //Add routes
        app.router.add([
            {
                '': () => {
                    app.router.navigate('/login');
                }
            },
            {
                '/login': () => {
                    document.querySelector('#main-router-output').innerHTML = loginTemplate();
                    let loginButton = document.querySelector('#login-button');
                    let that = this;
                    loginButton.addEventListener("click", function () {
                        //TO DO
                        //LOGIN FORM VALIDATION !!!
                        that.router.navigate('/profile/about');
                    });

                }
            }, {
                '/profile': () => {
                    app.router.navigate('/profile/about');
                }
            }, {
                '/profile/:route': (data) => {
                    if (document.querySelector('#profile-nav') === null) {
                        document.querySelector('#main-router-output').innerHTML = profileTemplate();
                        app.router.activateRouterLinks('#profile-nav');
                        this.swapMenu();
                        let btnLogout = document.querySelector('.btn--outline-blue__logout');
                        let that = this;
                        btnLogout.addEventListener('click', function () {                            
                            that.router.navigate('/login');
                        });
                    }
                    var profileRouteOutput = document.querySelector('#profile-route-output');
                    switch (data.route) {
                        case 'about':
                            profileRouteOutput.innerHTML = profileAboutTemplate();

                            let btnsEdit = document.querySelectorAll('.about__desktop .btn__edit');

                            btnsEdit.forEach((btnEdit) => {
                                let popups = document.querySelectorAll('.about__desktop .popup-edit');
                                let that = this;
                                btnEdit.addEventListener('click', function () {
                                    that.DOMModule.addClass(popups, '--hidden-alpha');
                                    let target = this.getAttribute('data-target');
                                    let popup = document.querySelector('.about__desktop .' + target + ' .popup-edit');
                                    let btnCancel = popup.querySelector('.btn__cancel');
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
                            profileRouteOutput.innerHTML = profileSettingsTemplate();
                            break;
                        default:
                            profileRouteOutput.innerHTML = `
                            <section class="subpage subpage__settings">
                                <h1>${data.route}</h1>
                            </section>`;

                    }
                }
            }]
        );
        //\Add routes        
    }

    swapMenu() {
        let menu = document.querySelector('.navbar');
        let menuWidth = menu.offsetWidth;
        let menuContent = menu.querySelector('.navbar-content');
        let menuContentWidth = menuContent.offsetWidth;
        let startX;
        menu.addEventListener('touchstart', function () {
            let rect = menu.getBoundingClientRect();
            startX = event.touches[0].clientX - rect.left;
        });
        menu.addEventListener('touchmove', function () {
            let rect = menu.getBoundingClientRect();
            let x = event.touches[0].clientX - rect.left;
            let menuContentX = (x - startX);
            let menuContentMinX = menuWidth - menuContentWidth
            if (menuContentX > 0) {
                menuContentX = 0;
            }
            if (menuContentX < menuContentMinX) {
                menuContentX = menuContentMinX
            }
            menuContent.style.left = menuContentX + 'px';
        });
        window.addEventListener('resize', function () {
            menuContent.style.left = '0px';
        })
    }
}

new App();