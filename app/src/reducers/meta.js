import Immutable from 'seamless-immutable';

export const INITIAL_STATE = Immutable({
    init: false,
});

export const metaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'META_TOGGLE':
            return state.merge({
                [action.payload.key]: !state[action.payload.key],
            });
        case 'META_SET':
            return state.merge({
                [action.payload.key]: action.payload.value,
            });
        default:
            return state;
    }
};
