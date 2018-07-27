// StoreModule
// ES6+ watchable store | constrjs project
// Author: Zbigi Man Zbigniew Stępniewski 2017
export class StoreModule {
    constructor(settings) {

        //Prototypes
        Object.prototype.Str = function () {
            return JSON.stringify(this);
        }

        Object.prototype.Imut = function () {
            let _this;
            try {
                _this = JSON.parse(this.Str());
            } catch(e) {
                _this = this;
            }
            return _this;
        }

        Object.prototype.Get = function (path) {
            var obj = this;
            var getter = new Function("obj", "return obj." + path + ";");
            return getter(store);
        }

        Object.prototype.Set = function (path, value) {
            var obj = this;
            var setter = new Function("obj", "value", "obj." + path + " = value;");
            return setter(store, value);
        }
        //\

        //settings
        var storeModule = this,
            store = settings.store,
            watched = [];
        //\

        //console
        if (settings.console != true) {
            console.logStore = console.logTime = console.logTimeEnd = console.logGroup = console.logGroupEnd = console.logError = () => {
                return false;
            };
        } else {
            console.logStore = (log) => {
                console.log(log);
            };
            console.logTime = (log) => {
                console.time(log);
            };
            console.logTimeEnd = (log) => {
                console.timeEnd(log);
            };
            console.logGroup = (log) => {
                console.group(log);
            };
            console.logGroupEnd = () => {
                console.groupEnd();
            };
            console.logError = (log) => {
                console.error(log);
            };
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
                            value = storeModule.Get({
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
        };

        //GET ALL STORE
        this.GetAll = () => {
            return JSON.parse(store.Str());
        }

        //GET
        this.Get = (caller, path) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            if (caller.name !== '~store') {
                console.logGroup('Store => GET');
            }
            let value = store.Get(path).Imut();
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
        };

        //SET
        this.Set = (caller, path, value) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            console.logGroup('Store => SET');
            let prevValue = this.Get({
                name: '~store'
            }, path);
            if (prevValue) {
                if (prevValue.Str() == value.Str()) {
                    console.logStore(logcaller);
                    console.logStore('Skipped: nothig changed');
                    console.logGroupEnd();
                    return;
                }
            }
            store.Set(path, value);
            console.logStore(logcaller);
            console.logStore(logPath);
            console.logStore('Value:');
            console.logStore(value);
            console.logGroupEnd();
            onWatch(caller, path, value, 'set');
        };

        //PUSH
        this.Push = (caller, path, value) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            console.logGroup('Store => PUSH');
            let array = this.Get({
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
            if (prevValue.Str() == value.Str()) {
                console.logStore(logcaller);
                console.logStore(logPath);
                console.logStore('Value:');
                console.logStore(value);
                console.logStore('Skipped: nothig changed');
                console.logGroupEnd();
                return;
            }
            array.push(value);
            store.Set(path, array);
            console.logStore(logcaller);
            console.logStore(logPath);
            console.logStore('Value:');
            console.logStore(value);
            console.logGroupEnd();
            onWatch(caller, path, value, 'push');
        };
        //\

        //REMOVE
        this.Remove = (caller, path, value) => {
            let callerName = caller.name || caller.constructor.name,
                logPath = 'Path: store.' + path;
            let logcaller = 'Caller: ' + callerName;
            console.logGroup('Store => REMOVE');
            let array = this.Get({
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
                if (value) return item.Str() != value.Str();
            });
            store.Set(path, newArray);
            console.logStore(logcaller);
            console.logStore(logPath);
            console.logStore('Value:');
            console.logStore(value);
            console.logGroupEnd();
            onWatch(caller, path, value, 'remove');
        };
        //\

        //WATCH
        this.Watch = (watcher, path, reaction) => {
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
        };
        //\
    }
}