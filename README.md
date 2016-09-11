<h1 align="center">@nhz.io/mini-mock</h1>

<p align="center">
  <a href="https://npmjs.org/package/@nhz.io/mini-mock">
    <img src="https://img.shields.io/npm/v/@nhz.io/mini-mock.svg?style=flat"
         alt="NPM Version">
  </a>

  <a href="https://www.bithound.io/github/nhz-io/mini-mock">
    <img src="https://www.bithound.io/github/nhz-io/mini-mock/badges/score.svg"
         alt="Bithound Status">
  </a>

  <a href="https://github.com/nhz-io/mini-mock/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/nhz-io/mini-mock.svg?style=flat"
         alt="License">
  </a>

  <a href="https://npmjs.org/package/@nhz.io/mini-mock">
  <img src="http://img.shields.io/npm/dm/@nhz.io/mini-mock.svg?style=flat"
  alt="Downloads">
  </a>  
</p>

<h3 align="center">Patch `require()` to return mocks<h2>

## Install
```
npm i -D @nhz.io/mini-mock
```

## Usage
```
// will-get-mock.js
const someModule = require('some-module')
...
```

```
// will-get-real.js
const someModule = require('some-module')
...
```

```
// test.js
require('@nhz.io/mini-mock')

module.mock('some-module', 'Mocked value')
require('./will-get-mock.js')

module.unmock('some-module')
require('./will-get-real.js')
...
```

## License

### [MIT](LICENSE)
