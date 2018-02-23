import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import LogicsMiddleware from './redux-logic-config';
const composeEnhancers =
    process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;
const enhancer = composeEnhancers(applyMiddleware(LogicsMiddleware));
export const store = createStore(reducers, enhancer);
