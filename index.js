'use strict'

const Module = require('module')

/** @typedef {Function} NIL */

/** Magic NIL
  * @type {NIL}
  */
const NIL = () => NIL

/** @typedef {Object} Module */

/** Recursively find mock by name
  * @param {Module} module
  * @param {String} name
  * @return {* | NIL}
  */
function findMockRecursively(module, name) {
    switch (true) {
        case !module || !name || !module._mocks:
            break

        case module._mocks[name] === NIL:
            break

        case module._mocks.hasOwnProperty(name):
            return module._mocks[name]

        case Boolean(module.parent):
            return findMockRecursively(module.parent, name)

        default:
            break
    }

    return NIL
}

/** @typedef {Function} Require */

/** Backup require
  * @type {Require}
  */
Module.prototype._require =
    Module.prototype._require || Module.prototype.require

/** Patch require to resolve mocks */
Module.prototype.require = function (name) {
    this._mocks = this._mocks || {}

    const mock = findMockRecursively(this, name)

    return mock !== NIL ? mock : this._require(name)
}

/** Register mock - access with: `module.mock(name, value)`
  * @param {String} name - module name/path
  * @param {*} value - any value
  * @return {*} mocked value
  */
Module.prototype.mock = function mock(name, value) {
    if (name) {
        this._mocks = this._mocks || {}
        return this._mocks[name] = value
    }
}

/** Unregister mock - access with: `module.unmock(name, doNotInherit)`
  * @param {String} name
  * @param {Boolean} doNotInherit - dont inherit mocks from parent
  * @return {*} unmocked value
*/
Module.prototype.unmock = function unmock(name, doNotInherit) {
    if (name) {
        this._mocks = this._mocks || {}
        const value = this._mocks[name]
        if (doNotInherit) {
            this._mocks[name] = NIL
        }
        else {
            delete this._mocks[name]
        }
        return value
    }
}
