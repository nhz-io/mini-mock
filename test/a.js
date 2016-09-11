const t = require('assert')

require('../index')

t.ok(!module._mocks || Object.keys(module._mocks).length === 0, 'Module `a.js` has mocks prematurely')
t.ok(typeof module.mock === 'function', '`mock(name, value)` method is missing')
t.ok(typeof module.unmock === 'function', '`unmock(name)` method is missing')

module.mock('test', 'a-test ok')
t.ok(module._mocks && module._mocks.test === 'a-test ok', 'Did not register the `test` mock')

module.mock('a-test', 'a-test ok')
t.ok(module._mocks && module._mocks.test === 'a-test ok', 'Did not register the `a-test` mock')

t.ok(require('test') === 'a-test ok', 'Failed to return the `test` mock from `require()`')
t.ok(require('a-test') === 'a-test ok', 'Failed to return the `a-test` mock from `require()`')

t.ok(module.unmock('a-test') === 'a-test ok', 'Did not return the `a-test` unmocked value')
t.throws(() => require('a-test'), 'Did not unregister the `a-test` mock')

require('./b')

t.ok(Object.keys(module._mocks).length === 1, 'Some mocks leaked from required modules')
t.throws(() => require('b-test'), '`b-test` mock has leaked into `a.js`')
t.throws(() => require('c-test'), '`c-test` mock has leaked into `a.js`')
