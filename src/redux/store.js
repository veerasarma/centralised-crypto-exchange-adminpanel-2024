import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
const middleware = [thunk]

const initialState = {}
let store
if (process.env.REACT_APP_MODE === 'production' || process.env.REACT_APP_MODE === 'demo') {
  store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  )
}
// const store = createStore(changeState)
export default store
