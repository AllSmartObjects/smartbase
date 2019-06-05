/* eslint-env mocha */
const chai = require('chai')

const { expect } = chai
const SmartObject = require('smartobject')
const smartbase = require('../index.js')

describe('Functional Check', () => {
  let so = new SmartObject()

  const plugin1 = {
    oid: 'lightCtrl',
    iid: 0,
    handle: {},
    active: true,
    setup: null,
    resources: {
      onOff: 1
    }
  }

  const plugin2 = {
    oid: 'lightCtrl',
    iid: 1,
    handle: {},
    active: true,
    setup: null,
    resources: {
      onOff: 0
    }
  }

  const plugin3 = {
    oid: 'temperature',
    iid: 0,
    handle: {},
    setup: null,
    resources: {
      sensorValue: 30
    }
  }

  so = smartbase(so, {
    led0: plugin1,
    led1: plugin2,
    temp0: plugin3
  })

  it('should has object instance lightCtrl/0', () => {
    expect(so.has('lightCtrl', 0)).to.be.equal(true)
  })

  it('should has object instance lightCtrl/1', () => {
    expect(so.has('lightCtrl', 0)).to.be.equal(true)
  })

  it('should has object instance temperature/0', () => {
    expect(so.has('temperature', 0)).to.be.equal(true)
  })

  it('should fire and listened via onChange correctly', (done) => {
    so.onChange('hello', (data) => {
      if (data === 1) { done() }
    })

    setImmediate(() => {
      so._emit('hello', 1)
    })
  })

  it('should fire and listened via on correctly', (done) => {
    so.onChange('helloY', (data) => {
      if (data === 1) { done() }
    })

    setImmediate(() => {
      so._emit('helloY', 1)
    })
  })

  it('should init correctly', () => {
    expect(so.get('temperature', 0, 'sensorValue')).to.be.equal(30)
    expect(so.get('lightCtrl', 0, 'onOff')).to.be.equal(1)
    expect(so.get('lightCtrl', 1, 'onOff')).to.be.equal(0)
  })

  it('should report change of temperature/0/sensorValue correctly', (done) => {
    so.onChange('temperature/0/sensorValue', (cVal, pVal) => {
      if (cVal === 80 && pVal === 30) { done() }
    })
    so.write('temperature', 0, 'sensorValue', 80, (err, data) => {
      expect(err).to.be.equal(null)
      // console.log(err);
      // console.log(data);
    })
  })

  it('should report change of temp0/sensorValue correctly', (done) => {
    so.onChange('temp0/sensorValue', (cVal, pVal) => {
      if (cVal === 50 && pVal === 80) { done() }
    })
    so.write('temperature', 0, 'sensorValue', 50, (err, data) => {
      expect(err).to.be.equal(null)
      // console.log(err);
      // console.log(data);
    })
  })

  it('should report change of lightCtrl/0/onOff correctly', (done) => {
    so.onChange('lightCtrl/0/onOff', (cVal, pVal) => {
      if (cVal === 0 && pVal === 1) { done() }
    })
    so.write('lightCtrl', 0, 'onOff', 0, (err, data) => {
      expect(err).to.be.equal(null)
      // console.log(err);
      // console.log(data);
    })
  })

  it('should report change of led0/onOff correctly', (done) => {
    so.onChange('led0/onOff', (cVal, pVal) => {
      if (cVal === 1 && pVal === 0) { done() }
    })
    so.write('lightCtrl', 0, 'onOff', 1, (err, data) => {
      expect(err).to.be.equal(null)
      // console.log(err);
      // console.log(data);
    })
  })

  it('should report change of lightCtrl/1/onOff correctly', (done) => {
    so.onChange('lightCtrl/1/onOff', (cVal, pVal) => {
      if (cVal === 1 && pVal === 0) { done() }
    })
    so.write('lightCtrl', 1, 'onOff', 1, (err, data) => {
      expect(err).to.be.equal(null)
      // console.log(err);
      // console.log(data);
    })
  })

  it('should report change of led1/onOff correctly', (done) => {
    so.onChange('led1/onOff', (cVal, pVal) => {
      if (cVal === 0 && pVal === 1) { done() }
    })
    so.write('lightCtrl', 1, 'onOff', 0, (err, data) => {
      expect(err).to.be.equal(null)
      // console.log(err);
      // console.log(data);
    })
  })
})
