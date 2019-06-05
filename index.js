
const soWatchify = require('smartobject-watchify')

module.exports = function smartbase (so, plugins) {
  const iidEvents = {}

  so = soWatchify(so)
  so.hal = so.hal || {}

  // prepare hal and setup functions
  for (let name in plugins) {
    if (plugins.hasOwnProperty(name)) { so.hal[name] = plugins[name].handle }
  }

  // initialize the smart object
  for (let name in plugins) {
    if (plugins.hasOwnProperty(name)) {
      const plugin = plugins[name]
      const { oid } = plugin
      const { iid } = plugin
      const { resources } = plugin
      const { setup } = plugin
      const iidEvent = `${oid}/${iid}/`

      iidEvents[iidEvent] = name

      so.init(oid, iid, resources, function () {
        if (typeof setup === 'function') { setup.call(this) }
      })
    }
  }

  for (const ievt in iidEvents) {
    if (iidEvents.hasOwnProperty(ievt)) {
      // Bridge to alias event
      so.onChange(ievt, (rRec) => { // { iPath, rid: rid, cVal: currentValue, pVal: oldValue }
        const bridgedEvt = `${iidEvents[rRec.iPath]}/${rRec.rid}`
        so._emit(bridgedEvt, rRec.cVal, rRec.pVal)
      })
    }
  }

  return so
}
