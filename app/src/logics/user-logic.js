import { createLogic } from 'redux-logic';
export const login = createLogic({
    type: 'LOGIN',
    latest: true,
    processOptions: {
        dispatchReturn: false,
    },
    process({ action, apiBase, toast }, dispatch, done) {
        dispatch(
            fetch(apiBase + '/users/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(action.payload),
            })
                .then(response => {
                    if (response.ok) return response.json();
                    let error = new Error(response.statusText);
                    error.status = response.status;
                    throw error;
                })
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'SET_USER',
                            payload: data,
                        });
                        toast.success('Welcome ' + data.user.email);
                    } else {
                        toast.error('Incorrect credential');
                    }
                    done();
                })
                .catch(error => {
                    if (error.message) toast.error(error.message);
                    done();
                })
        );
    },
});
const logout = createLogic({
    type: 'LOGOUT',
    latest: true,
    processOptions: {
        dispatchReturn: false,
    },
    process({ apiBase, toast }, dispatch, done) {
        dispatch(
            fetch(apiBase + '/users/logout', {
                credentials: 'include',
            })
                .then(() => {
                    dispatch({ type: 'UNSET_USER' });
                    done();
                })
                .catch(e => {
                    toast.error(e);
                    done();
                })
        );
    },
});
export const checkLogin = createLogic({
    type: 'CHECK_LOGIN',
    latest: true,
    processOptions: {
        dispatchReturn: false,
    },
    process({ apiBase, toast }, dispatch, done) {
        dispatch(
            fetch(apiBase + '/users/me', {
                credentials: 'include',
            })
                .then(response => {
                    if (response.ok) return response.json();
                    let error = new Error(response.statusText);
                    error.status = response.status;
                    throw error;
                })
                .then(data => {
                    if (data.success) {
                        dispatch({
                            type: 'SET_USER',
                            payload: data,
                        });
                        toast.success('Welcome back ' + data.user.email);
                    }
                    done();
                })
                .catch(error => {
                    if (error.message) toast.error(error.message);
                    done();
                })
        );
    },
});
export const userLogics = [login, logout, checkLogin];
export default userLogics;
