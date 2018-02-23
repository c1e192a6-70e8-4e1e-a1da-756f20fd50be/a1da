import Immutable from 'seamless-immutable';
import get from 'lodash/get';

export const INITIAL_STATE = Immutable({
    logined: false,
    id: '',
    email: '',
});

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            return state.merge({
                logined: true,
                id: get(action, 'payload.user.id'),
                email: get(action, 'payload.user.email'),
                ...action.payload,
            });
        case 'UNSET_USER':
            return INITIAL_STATE;
        default:
            return state;
    }
};
