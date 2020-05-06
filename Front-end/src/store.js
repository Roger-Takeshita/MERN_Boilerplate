import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './redux/user';
import logger from 'redux-logger';

const reducers = combineReducers({
    user: userReducer
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;
