import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../forms/login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginPageClass extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func,
        logined: PropTypes.bool,
    };

    handleSubmit = formValues => {
        this.props.dispatch({
            type: 'LOGIN',
            payload: formValues,
        });
    };

    render() {
        if (this.props.logined) return <Redirect to={'/dashboard'} />;

        return (
            <div className="page-content center">
                <LoginForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    logined: state.user.logined,
});

export const LoginPage = connect(mapStateToProps)(LoginPageClass);
