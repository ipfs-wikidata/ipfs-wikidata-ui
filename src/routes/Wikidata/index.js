import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: '/',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const WikidataContainer = require('./containers/WikidataContainer').default
      const reducer = require('./modules/wikidata').default

      /*  Add the reducer to the store on key 'wikidata'  */
      injectReducer(store, { key: 'wikidata', reducer })

      /*  Return getComponent   */
      cb(null, WikidataContainer)

    /* Webpack named bundle   */
  }, 'wikidata')
  }
})
