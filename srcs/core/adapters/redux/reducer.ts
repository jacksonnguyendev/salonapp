import {combineReducers} from 'redux';
import {userReducer} from './user';
import {authReducer} from './auth';
import {storeReducer} from './store';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  store: storeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
