// StoreModule
// ES6+ watchable store | constrjs project
// Author: Zbigi Man Zbigniew Stępniewski 2017
//import _ from 'lodash';
import _ from '../../examples/constrjs-watchable-store-example/node_modules/lodash'
export class StoreModule {
    constructor(settings) {

        //Prototypes
        Object.prototype.str = function () {
            return JSON.stringify(this);
        }
        //\

        //settings
        var storeModule = this,
            store = settings.store,
            watched = new Array();
        //\

        //console
        if (settings.console != true) {
            console.logStore = console.logTime = console.logTimeEnd = console.logGroup = console.logGroupEnd = console.logError = () => {
                return false;
            }
        } else {
            console.logStore = (log) => {
                console.log(log);
            }
            console.logTime = (log) => {
                console.time(log);
            }
            console.logTimeEnd = (log) => {
                console.timeEnd(log);
            }
            console.logGroup = (log) => {
                console.group(log);
            }
            console.logGroupEnd = () => {
                console.groupEnd();
            }
            console.logError = (log) => {
                console.error(log);
            }
        }
        //\

        var onWatch = (caller, path, change, method) => {
            let parts = path.split('.');
            let table = parts[0];
            if (watched[table] !== undefined) {
                watched[table].forEach((fullpath) => {
                    let parts = fullpath.split('~');
                    let watchedPath = parts[1],
                        watcherName = parts[0];
                    if (watched[table][fullpath] !== undefined) {
                        let reaction = watched[table][fullpath]['reaction'],
                            watcher = watched[table][fullpath]['watcher'],
                            value = storeModule.get({
                                name: '~store'
                            }, watchedPath),
                            logWatch = 'Store => Watch ',
                            logWatcher = 'Watcher: ' + watcherName,
                            logPath = 'Path: ' + watchedPath,
                            logValue = 'Value:',
                            logChange = 'Change',
                            logReaction = 'Reaction: ' + reaction,
                            logMethod = 'Method: ' + method,
                            _return = {
                                'caller': caller,
                                'path': path,
                                'value': value,
                                'change': change,
                                'method': method
                            };
                        console.logGroup(logWatch);
                        console.logStore(logWatcher);
                        console.logStore(logPath);
                        console.logStore(logValue);
                        console.logStore(value);
                        console.logStore(logChange);
                        console.logStore(change);
                        console.logStore(logMethod);
                        console.logStore(logReaction);
                        if (watcher[reaction] !== undefined) {
                            watcher[reaction].apply(watcher, [_return]);
                        } else if (typeof reaction == 'function') {
                            reaction.apply(watcher, [_return]);
                        }
                        console.logGroupEnd();
                    }
                });
                console.logGroupEnd();
            } else {
                console.logGroupEnd();
            }
        }

        //GET ALL STORE
        this.getAll = () => {
            return JSON.parse(store.str());
        }

        //GET
        this.get = (caller, path) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            if (caller.name !== '~store') {
                console.logGroup('Store => GET');
            }
            let value = _.get(JSON.parse(store.str()), path);
            if (value === undefined) {
                return;
            }
            if (caller.name !== '~store') {
                console.logStore(logcaller);
                console.logStore(logPath);
                console.logStore('Value:');
                console.logStore(value);
                console.logGroupEnd();
            }
            return value;
        }

        //SET
        this.set = (caller, path, value) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            console.logGroup('Store => SET');
            let prevValue = this.get({
                name: '~store'
            }, path);
            if (prevValue) {
                if (prevValue.str() == value.str()) {
                    console.logStore(logcaller);
                    console.logStore('Skipped: nothig changed');
                    console.logGroupEnd();
                    return;
                }
            }
            _.set(store, path, value);
            console.logStore(logcaller);
            console.logStore(logPath);
            console.logStore('Value:');
            console.logStore(value);
            console.logGroupEnd();
            onWatch(caller, path, value, 'set');
        }

        //PUSH
        this.push = (caller, path, value) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            console.logGroup('Store => PUSH');
            let array = this.get({
                name: '~store'
            }, path);
            let prevValue = array;
            if (Array.isArray(array) === false) {
                console.logStore(logcaller);
                console.logStore(logPath);
                console.logStore('Value:');
                console.logStore(value);
                console.logError('Skipped: The path store.' + path + 'is not array');
                console.logGroupEnd();
                return;
            }
            if (prevValue.str() == value.str()) {
                console.logStore(logcaller);
                console.logStore(logPath);
                console.logStore('Value:');
                console.logStore(value);
                console.logStore('Skipped: nothig changed');
                console.logGroupEnd();
                return;
            }
            array.push(value);
            _.set(store, path, array);
            console.logStore(logcaller);
            console.logStore(logPath);
            console.logStore('Value:');
            console.logStore(value);
            console.logGroupEnd();
            onWatch(caller, path, value, 'push');
        };
        //\

        //REMOVE 
        this.remove = (caller, path, value) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            console.logGroup('Store => REMOVE');
            let array = this.get({
                name: '~store'
            }, path);
            if (Array.isArray(array) === false) {
                console.logStore(logcaller);
                console.logStore(logPath);
                console.logStore('Value:');
                console.logStore(value);
                console.logError('Skipped: The path store.' + path + 'is not array');
                console.logGroupEnd();
                return;
            }
            let newArray = array.filter((item) => {
                if (value) return item.str() != value.str();
            });
            _.set(store, path, newArray);
            console.logStore(logcaller);
            console.logStore(logPath);
            console.logStore('Value:');
            console.logStore(value);
            console.logGroupEnd();
            onWatch(caller, path, value, 'remove');
        }
        //\

        //WATCH
        this.watch = (watcher, path, reaction) => {
            let watcherName = watcher.name || watcher.constructor.name,
                paths = path;
            if (Array.isArray(path) === false) {
                paths = [path];
            }
            paths.forEach((path) => {
                let fullpath = watcherName + "~" + path;
                let parts = path.split('.');
                let table = parts[0];
                if (watched[table] === undefined) {
                    watched[table] = [];
                }
                if (watched[table].indexOf(fullpath) == -1) {
                    watched[table].push(fullpath);
                    watched[table][fullpath] = {
                        reaction: reaction,
                        watcher: watcher
                    }
                }
            });
        }
        //\
    }
}