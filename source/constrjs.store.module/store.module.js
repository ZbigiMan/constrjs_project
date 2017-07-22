// StoreModule
// ES6+ watchable store | :{constrjs} project
// Author: Zbigi Man Zbigniew Stępniewski 2017
//import _ from 'lodash';
import _ from '../../examples/constrjs-watchable-store-example/node_modules/lodash'
export class StoreModule {
    constructor(settings) {

        //prototypes
        Object.prototype.str = function () {
            return JSON.stringify(this);
        }

        //settings
        var storeModule = this,
            store = settings.store,
            watched = new Array();

        //console
        if (settings.console != true) {
            console.logStore = console.logTime = console.logTimeEnd = console.logGroup = console.logGroupEnd = () => {
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
        }
        //\console    

        var onWatch = (caller, path, value) => {
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
                            data = storeModule.get({ name: '~store' }, watchedPath),
                            logWatch = 'Store => Watch ',
                            logWatcher = 'Watcher: ' + watcherName,
                            logAction = 'Reaction: ' + reaction,
                            log = 'done in';
                        console.logGroup(logWatch)
                        console.logTime(log);
                        console.logStore(logWatcher);
                        console.logStore(logAction);
                        if (watcher[reaction] !== undefined) {
                            watcher[reaction].apply(watcher, [data]);
                        } else if (typeof reaction == 'function') {
                            reaction.apply(watcher, [data]);
                        }
                        console.logTimeEnd(log);
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
            let log = 'Done in',
                callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            if (caller.name !== '~store') {
                console.logGroup('Store => GET');
                console.logTime(log);
            }
            let value = _.get(JSON.parse(store.str()), path);
            if (value === undefined) {
                return;
            }
            if (caller.name !== '~store') {
                console.logTimeEnd(log);
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
            let log = 'Done in',
                callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            console.logGroup('Store => SET');
            console.logTime(log);
            let prevValue = this.get({ name: '~store' }, path) || {};
            if (prevValue.str() == value.str()) {
                console.logTimeEnd(log);
                console.logStore(logcaller);
                console.logStore('Skipped: nothig changed');
                console.logGroupEnd();
                return;
            }
            _.set(store, path, value);
            console.logTimeEnd(log);
            console.logStore(logcaller);
            console.logStore(logPath);
            console.logStore('Value:');
            console.logStore(value);
            console.logGroupEnd();
            onWatch(caller, path, value);
        }

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
    }
}