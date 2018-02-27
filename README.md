<p align="center">
  <strong>Logger for Amnis applications</strong>
</p>

This package uses [`redux-logger`](http://npm.im/redux-logger) for it's entire functionality.
<br />
The only difference being the way you attach it: `redux-logger` is attached as middleware and [`amnis`](http://npm.im/amnis) doesn't have the concept of middleware, so you attach the logger onto your root reducer.

## 🔧 Installation

Assuming you use [npm](https://www.npmjs.com/) as your package manager:
```text
npm install --save amnis-logger
```
UMD build:
```html
<script type="application/javascript" src="https://unpkg.com/amnis-logger"></script>
```
Refer to the examples section at the bottom to see the UMD build in action.

### Usage
Since [`amnis`](http://npm.im/amnis) doesn't have the concept of middleware, you attach the logger directly onto your root reducer:
```js  
import {createStore} from 'amnis'  
import {withLogging} from 'amnis-logger'
import {rootReducer} from './reducers'
  
const store = createStore(withLogging(reducer, {collapsed: true}))
```
You can configured the logger by passing in the `options` parameter as the seconds argument.
<br />
Please refer to [`redux-logger`](http://npm.im/redux-logger)'s documentation for the list of available options.
```js    
const loggerOptions = {
  collapsed: true,
  diff: false
}
const store = createStore(withLogging(reducer, loggerOptions))
```
##### Logging only in development
```js
import {createStore} from 'amnis'  
import {withLogging} from 'amnis-logger'
import {rootReducer} from './reducers'

if  (process.env.NODE_ENV  ===  `development`)  {
  rootReducer = require('amnis-logger').withLogging(rootReducer)
}
  
const store = createStore(rootReducer)
```

### 📓 Examples 

You can see a basic example in [this jsFiddle](https://jsfiddle.net/petershev/n682rqLc/).

## 🍻 License
MIT