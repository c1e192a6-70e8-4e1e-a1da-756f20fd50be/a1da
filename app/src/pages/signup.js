import React from 'react';
import PropTypes from 'prop-types';
import SingUpFrom from '../forms/signup';
import { apiBase } from '../settings';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class SignUpClass extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        logined: PropTypes.bool,
    };

    onSubmit = formValues => {
        return fetch(apiBase + '/users/', {
            credentials: 'include',
            body: JSON.stringify(formValues),
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) return response.json();
                let error = new Error(response.statusText);
                error.status = response.status;
                throw error;
            })
            .then(data => {
                if (data.id) {
                    this.props.dispatch({
                        type: 'SET_USER',
                        payload: { user: data },
                    });
                }
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    render() {
        if (this.props.logined) return <Redirect to={'/dashboard'} />;
        return (
            <div className="page-content center">
                <SingUpFrom onSubmit={this.onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    logined: state.user.logined,
});

export const SignUpPage = connect(mapStateToProps)(SignUpClass);
