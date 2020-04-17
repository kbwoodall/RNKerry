/*  store  */

import { createStore } from 'redux'
import { placeReducer } from './reducers/placeReducer'

const rootReducer = combineReducers({
    places: placeReducer
})

const configureStore = () => {
    return createStore(rootReducer)
}
export default configureStore;