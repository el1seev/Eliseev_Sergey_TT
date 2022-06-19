import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from "redux-saga";
import { reducer } from './reducers/combineReducers.js';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
    
    
const configureStore = () => createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

const store = configureStore({});


sagaMiddleware.run(rootSaga);

export default store;