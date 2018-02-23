import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import { mustBeEmail, required, passwordLength, passwordCharacters } from './validators';
import { apiBase } from '../settings';
import noop from 'lodash/noop';

export class SignUpFormComponent extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        onSubmit: PropTypes.func,
        submitting: PropTypes.bool,
    };
    render() {
        const { handleSubmit, onSubmit, submitting } = this.props;
        return (
            <Paper style={{ width: 450 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Toolbar style={{backgroundColor: '#118381'}}>
                        <ToolbarTitle text="Sign Up" style={{color: 'white'}}/>
                    </Toolbar>
                    <div style={{ padding: '0 24px 12px' }}>
                        <div className="form-row">
                            <Field
                                name="email"
                                component={TextField}
                                label="Email"
                                floatingLabelText="Email"
                                disabled={submitting}
                                validate={[required, mustBeEmail]}
                                fullWidth
                            />
                        </div>
                        <div className="form-row">
                            <Field
                                name="password"
                                component={TextField}
                                floatingLabelText="Password"
                                disabled={submitting}
                                validate={[required, passwordLength, passwordCharacters]}
                                fullWidth
                            />
                        </div>
                        <div style={{ margin: '1em 0', textAlign: 'right' }}>
                            <RaisedButton label="Sign Up" disabled={submitting} type="submit" primary />
                        </div>
                    </div>
                </form>
            </Paper>
        );
    }
}
const SignUpForm = reduxForm({
    form: 'SignUp',
    asyncBlurFields: ['email'],
    asyncValidate: values => {
        return fetch(apiBase + '/users/checkEmail?email=' + values.email)
            .then(response => {
                if (response.ok) return response.json();
                let error = new Error(response.statusText);
                error.status = response.status;
                throw error;
            })
            .then(result => {
                if (!result || !result.available) return { email: 'Already Taken' };
            })
            .catch(noop);
    },
})(SignUpFormComponent);
export default SignUpForm;
