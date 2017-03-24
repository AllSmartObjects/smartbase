'use strict';

var soWatchify = require('smartobject-watchify');

module.exports = function smartbase(so, plugins) {
    var iidEvents = {};

    so = soWatchify(so);
    so.hal = so.hal || {};

    // prepare hal and setup functions
    for (var name in plugins) {
        if (plugins.hasOwnProperty(name))
            so.hal[name] = plugins[name].handle;
    }

    // initialize the smart object
    for (var name in plugins) {
        if (plugins.hasOwnProperty(name)) {
            var plugin = plugins[name],
                oid = plugin.oid,
                iid = plugin.iid,
                resources = plugin.resources,
                setup = plugin.setup,
                iidEvent = oid + '/' + iid + '/';

            iidEvents[iidEvent] = name;

            so.init(oid, iid, resources, function () {
                if (typeof setup === 'function')
                    setup.call(this);
            });
        }
    }

    for (var ievt in iidEvents) {
        if (iidEvents.hasOwnProperty(ievt)) {
            // Bridge to alias event
            so.onChange(ievt, function (rRec) { // { iPath, rid: rid, cVal: currentValue, pVal: oldValue }
                var bridgedEvt = iidEvents[rRec.iPath] + '/' + rRec.rid;
                so._emit(bridgedEvt, rRec.cVal, rRec.pVal);
            });
        }
    };

    return so;
};
