'use strict'

const t = require('assert')

require('../index')

t.ok(!module._mocks || Object.keys(module._mocks).length === 0, 'Module `b.js` has mocks prematurely')
t.ok(typeof module.mock === 'function', '`mock(name, value)` method is missing')
t.ok(typeof module.unmock === 'function', '`unmock(name)` method is missing')

t.ok(require('test') === 'a-test ok', 'Did not inherit the `test` mock from `a.js`')
module.mock('test', 'b-test ok')
t.ok(module._mocks && module._mocks.test === 'b-test ok', 'Did not register the `test` mock')
t.ok(require('test') === 'b-test ok', 'Did not override inherited `test` mock')

module.mock('b-test', 'b-test ok')
t.ok(module._mocks && module._mocks.test === 'b-test ok', 'Did not register the `b-test` mock')

require('./c')

t.ok(Object.keys(module._mocks).length === 2, 'Some mocks leaked into `b.js`')
t.throws(() => require('c-test'), '`c-test` mock has leaked in')
