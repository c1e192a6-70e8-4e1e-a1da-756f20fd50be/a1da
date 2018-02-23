import { createLogic } from 'redux-logic';
const startupLogic = createLogic({
    type: 'STARTUP',
    latest: true,
    process(_, dispatch, done) {
        dispatch({ type: 'CHECK_LOGIN' });
        done();
    },
});
export default [startupLogic];
