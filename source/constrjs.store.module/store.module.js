export class Store {
    constructor(settings) {
        Object.prototype.str = function () {
            return JSON.stringify(this);
        }

        //settings
        var appNameAndSpace = '';
        if(settings.app.name){
            appNameAndSpace = settings.app.name + ' ';
        }

        //console
        if (settings.console != 'on') {
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


        var onWatch = function (caller, path, value) {
            let parts = path.split('.');
            let table = parts[0];

            let that = this;

            if (watched[table] !== undefined) {
                watched[table].forEach((fullpath) => {
                    let parts = fullpath.split('~');
                    let watchedPath = parts[1],
                        watcherName = parts[0];

                    if (watched[table][fullpath] !== undefined && path.indexOf(watchedPath) != -1) {
                        let actionName = watched[table][fullpath]['reaction'],
                            watcher = watched[table][fullpath]['watcher'];

                        if (watcher['reactions'][actionName] !== undefined) {

                            let data = app.store.get({ name: '~store' }, watchedPath),
                                actionData = watcher['reactions'][actionName].data

                            if (actionData === undefined) actionData = {};

                            if (data.str() != actionData.str() || app.ready === true) {
                                let logWatch = app.name + ': Store => Watch ',
                                    logWatcher = 'Watcher: ' + watcherName,
                                    logAction = 'Reaction: ' + actionName
                                let log = 'done in';
                                console.logGroup(logWatch)
                                console.logTime(log);
                                console.logStore(logWatcher);
                                console.logStore(logAction);

                                watcher['reactions'][actionName]['fn'].apply(watcher, [data]);
                                watcher['reactions'][actionName].data = data;
                                console.logTimeEnd(log);
                                console.logGroupEnd();
                            }
                        }

                    }
                });
                console.logGroupEnd();
            } else {
                console.logGroupEnd();
            }
        }
    }


    getAllStore() {
        return JSON.parse(this.store.str());
    }
    get(caller, path) {
        let log = 'Done in',
            callerName = caller.name || caller.constructor.name,
            logPath = 'Path: app.store.' + path;

        let logcaller = 'Caller: ' + callerName;
        
        if (caller.name !== '~store') {
            console.logGroup(appNameAndSpace + 'Store => GET');
            console.logTime(log);
        }

        let value = _.get(JSON.parse(this.store.str()), path);

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
    set(caller, path, value) {

        let log = 'Done in',
            callerName = caller.name || caller.constructor.name,
            logPath = 'Path: app.store.' + path;

        let logcaller = 'Caller: ' + callerName;

        console.logGroup(appNameAndSpace + 'Store => SET');
        console.logTime(log);

        let prevValue = this.get({ name: '~store' }, path) || {};

        if (prevValue.str() == value.str() && app.ready !== true) {
            console.logTimeEnd(log);
            console.logStore(logcaller);
            console.logStore('Skipped: nothig changed');
            console.logGroupEnd();
            return;
        }

        _.set(this.store, path, value);

        console.logTimeEnd(log);
        console.logStore(logcaller);
        console.logStore(logPath);
        console.logStore('Value:');
        console.logStore(value);
        console.logGroupEnd();

        onWatch(caller, path, value);

    }
    watch(watcher, settings) {

        //console.log(watcher,settings);

        let watcherName = watcher.name || watcher.constructor.name,
            paths = settings.path;

        if (Array.isArray(settings.path) === false) {
            paths = [settings.path];
        }
        let that = this;
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
                    reaction: settings.reaction,
                    watcher: watcher
                }
            }
        });
    }
}