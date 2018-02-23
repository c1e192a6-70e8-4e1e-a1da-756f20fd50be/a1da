import Immutable from 'seamless-immutable';

export const INITIAL_STATE = Immutable({
    experts: {},
});
export const dataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_EXPERT':
            return state.setIn(['experts', action.payload.id], action.payload);
        default:
            return state;
    }
};
