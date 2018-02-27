import {createGenericLogger} from './generic-logger'

export const withLogging = (rootReducer, options = {}) => {
  const logger = createGenericLogger(options)

  return (state, action) =>
    logger(state, action, () => rootReducer(state, action))
}
