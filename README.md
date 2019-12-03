smartbase
========================
smartbase is a base board for you to create a smartobject with plugins.

[![NPM](https://nodei.co/npm/smartbase.png?downloads=true)](https://nodei.co/npm/smartbase/)

[![Travis branch](https://img.shields.io/travis/lwmqn/smartbase/master.svg?maxAge=2592000)](https://travis-ci.org/lwmqn/smartbase)
[![npm](https://img.shields.io/npm/v/smartbase.svg?maxAge=2592000)](https://www.npmjs.com/package/smartbase)
[![PyPI](https://img.shields.io/pypi/status/Django.svg?maxAge=2592000)](https://www.npmjs.com/package/smartbase)
[![npm](https://img.shields.io/npm/l/smartbase.svg?maxAge=2592000)](https://www.npmjs.com/package/smartbase)
[![Greenkeeper badge](https://badges.greenkeeper.io/lwmqn/smartbase.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/lwmqn/smartbase/badge.svg?branch=master)](https://coveralls.io/github/lwmqn/smartbase?branch=master)

<br />

## 1. Overview

This module helps developers integrate plugins into a smartobject. **smartbase** is like a carrier and plugins are various peripherals such as a LED, a temperature sensor, a switch to be put into the smartobject. In addition, **smartbase ** makes the smartobject listenable as well.

<br />

## 2. Installation

> $ npm install smartbase --save

<br />

## 3. Basic Usage

```js
var SmartObject = require('smartobject'),
    smartbase = require('smartbase');

// Plugin of a LED on LinkIt Smart 7688
var ledPlugin = require('linkit-smart-7688-led');
var so = new SmartObject();

so = smartbase(so, {
    led0: ledPlugin({ iid: 0, pin: 10, active: 'high' }),
    led1: ledPlugin({ iid: 1, pin: 11, active: 'low' })
});

// attach a listener to receive the change from resource 'lightCtrl/0/onOff'
so.onChange('lightCtrl/0/onOff', function (cVal, pVal) {
    console.log('A listener to this resource');
    console.log(cVal);  // current value
    console.log(pVal);  // previous value
});

so.onChange('temperature/0/sensorValue', function (cVal, pVal) {
    console.log('Another listener to this resource');
});

// Modify the sensorValue of the temperature sensor and the listener will be triggered
so.write('temperature', 0, 'sensorValue', 80, function (err, data) {
    if (err)
        console.log(err);
});
```

<br />
