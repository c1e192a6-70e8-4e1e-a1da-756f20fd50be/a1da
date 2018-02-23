import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { mustBeEmail, required } from './validators';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

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
                    <Toolbar>
                        <ToolbarTitle text="Login" />
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
                                validate={[required]}
                                type="password"
                                fullWidth
                            />
                        </div>
                        <div style={{ margin: '1em 0', textAlign: 'right' }}>
                            <RaisedButton label="Login" disabled={submitting} type="submit" primary />
                        </div>
                    </div>
                </form>
            </Paper>
        );
    }
}
const LoginForm = reduxForm({
    form: 'Login',
})(SignUpFormComponent);
export default LoginForm;
