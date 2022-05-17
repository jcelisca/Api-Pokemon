import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import pokesReducer from './pokeDucks'

const mainReducer = combineReducers({
    pokemones: pokesReducer
})

export default createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(thunk))
);