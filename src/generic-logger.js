/**
 * The following code is pretty much copied from redux-logger/src/index.
 * Since there is no easy way to reuse that functionality :(
 */

import printBuffer from 'redux-logger/src/core'
import {timer} from 'redux-logger/src/helpers'
import defaults from 'redux-logger/src/defaults'

/**
 * Creates logger with following options
 *
 * @namespace
 * @param {object} options - options for logger
 * @param {string | function | object} options.level - console[level]
 * @param {boolean} options.duration - print duration of each action?
 * @param {boolean} options.timestamp - print timestamp with each action?
 * @param {object} options.colors - custom colors
 * @param {object} options.logger - implementation of the `console` API
 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @param {boolean} options.collapsed - is group collapsed?
 * @param {boolean} options.predicate - condition which resolves logger behavior
 * @param {function} options.stateTransformer - transform state before print
 * @param {function} options.actionTransformer - transform action before print
 * @param {function} options.errorTransformer - transform error before print
 *
 * @returns {function} logger middleware
 */
export const createGenericLogger = (options = {}) => {
  const loggerOptions = Object.assign({}, defaults, options)

  const {
    logger,
    stateTransformer,
    errorTransformer,
    predicate,
    logErrors,
    diffPredicate,
  } = loggerOptions

  // Return if 'console' object is not defined
  if (typeof logger === 'undefined')
    return ((previousState, action, getNewState) => getNewState())

  const logBuffer = []

  return (previousState, action, getNewState) => {
    // Exit early if predicate function returns 'false'
    if (typeof predicate === 'function' && !predicate((() => previousState), action))
      return

    const logEntry = {}

    logBuffer.push(logEntry)

    logEntry.started = timer.now()
    logEntry.startedTime = new Date()
    logEntry.prevState = stateTransformer(previousState)
    logEntry.action = action

    let newState
    if (logErrors) {
      try {
        newState = getNewState()
      } catch (e) {
        logEntry.error = errorTransformer(e)
      }
    } else {
      newState = getNewState()
    }

    logEntry.took = timer.now() - logEntry.started
    logEntry.nextState = stateTransformer(newState)

    const diff = loggerOptions.diff && typeof diffPredicate === 'function'
      ? diffPredicate(() => newState, action)
      : loggerOptions.diff

    printBuffer(logBuffer, Object.assign({}, loggerOptions, { diff }))
    logBuffer.length = 0

    if (logEntry.error) throw logEntry.error

    return newState
  }
}
