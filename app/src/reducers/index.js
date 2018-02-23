import { combineReducers } from 'redux';

import { userReducer as user } from './user';
import { dataReducer as data } from './data';
import { metaReducer as meta } from './meta';
import { reducer as form } from 'redux-form';

export const reducers = combineReducers({
    data,
    meta,
    user,
    form,
});

export default reducers;
