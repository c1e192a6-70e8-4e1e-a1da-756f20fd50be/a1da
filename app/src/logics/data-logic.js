import { createLogic } from 'redux-logic';
export const fetchExpert = createLogic({
    type: 'FETCH_EXPERT',
    latest: false,
    processOptions: {
        dispatchReturn: false,
    },
    process({ apiBase, action }, dispatch, done) {
        dispatch(
            fetch(apiBase + '/experts/' + action.payload, {
                credentials: 'include',
            })
                .then(response => {
                    if (response.ok) return response.json();
                    let error = new Error(response.statusText);
                    error.status = response.status;
                    throw error;
                })
                .then(expertDetail => {
                    dispatch({ type: 'SET_EXPERT', payload: expertDetail });
                    done();
                })
                .catch(done)
        );
    },
});
export const dataLogics = [fetchExpert];
export default dataLogics;
