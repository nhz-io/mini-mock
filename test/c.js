'use strict'

const t = require('assert')

require('../index')

t.ok(!module._mocks || Object.keys(module._mocks).length === 0, 'Module `c.js` has mocks prematurely')
t.ok(typeof module.mock === 'function', '`mock(name, value)` method is missing')
t.ok(typeof module.unmock === 'function', '`unmock(name)` method is missing')

t.ok(require('test') === 'b-test ok', 'Did not inherit the `test` mock from `b.js`')
module.mock('test', 'c-test ok')
t.ok(module._mocks && module._mocks.test === 'c-test ok', 'Did not register the `test` mock')
t.ok(require('test') === 'c-test ok', 'Did not override inherited `test` mock')

t.ok(require('b-test') === 'b-test ok', 'Did not inherit the `b-test` mock from `b.js`')

module.unmock('test')
t.ok(!module._mocks['test'], 'Did not unregister `test` mock for `c.js`')
t.ok(require('test') === 'b-test ok', 'Did not fallback to parent `test` mock')

module.unmock('test', true)
t.throws(() => require('test'), 'Failed to force default require (doNotInherit had no effect)')

module.mock('c-test', 'c-test ok')
t.ok(module._mocks && module._mocks['c-test'] === 'c-test ok', 'Did not register the `c-test` mock')
t.ok(require('c-test') === 'c-test ok', 'Failed to return the `c-test` mock from `require()`')
