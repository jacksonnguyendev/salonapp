import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {rootReducer, rootSaga} from '../adapters/redux';

export const configureStore = () => {
  const middleware = [];
  const sagaMiddleware = createSagaMiddleware();

  middleware.push(sagaMiddleware);
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  const store = createStore(rootReducer, applyMiddleware(...middleware));

  sagaMiddleware.run(rootSaga);
  return store;
};
