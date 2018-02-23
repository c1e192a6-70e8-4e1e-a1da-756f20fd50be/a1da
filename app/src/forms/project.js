import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { required, titleLength } from './validators';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import ExpertsField from '../misc/experts-field';

export class ProjectFormComponent extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        onSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        editable: PropTypes.bool,
        pristine: PropTypes.bool,
    };

    render() {
        const { handleSubmit, onSubmit, submitting, editable, pristine } = this.props;
        return (
            <Paper style={{ width: 600 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Toolbar>
                        <ToolbarTitle text="Project Detail" />
                    </Toolbar>
                    <div style={{ padding: '0 24px 12px' }}>
                        <div className="form-row">
                            <Field
                                name="startDate"
                                component={TextField}
                                label="Start Date"
                                floatingLabelText="Start Date"
                                disabled={true}
                                fullWidth
                            />
                        </div>
                        <div className="form-row">
                            <Field
                                name="title"
                                component={TextField}
                                label="Title"
                                floatingLabelText="Title"
                                disabled={!editable || submitting}
                                validate={[required, titleLength]}
                                fullWidth
                            />
                        </div>
                        <div className="form-row">
                            <Field
                                name="status"
                                component={SelectField}
                                hintText="Status"
                                floatingLabelText="Status"
                                fullWidth
                                disabled={!editable || submitting}
                            >
                                <MenuItem value="new" primaryText="new" disabled />
                                <MenuItem value="unfinished" primaryText="unfinished" />
                                <MenuItem value="finished" primaryText="finished" />
                            </Field>
                        </div>
                        <div>
                            <Field
                                name="experts"
                                component={ExpertsField}
                                disabled={!editable || submitting}
                                fullWidth
                            />
                        </div>
                        <div style={{ margin: '1em 0', textAlign: 'right' }}>
                            {editable && (
                                <RaisedButton
                                    label="Save"
                                    disabled={pristine || !editable || submitting}
                                    type="submit"
                                    primary
                                />
                            )}
                        </div>
                    </div>
                </form>
            </Paper>
        );
    }
}
const ProjectForm = reduxForm({
    form: 'project-edit',
    enableReinitialize: true,
})(ProjectFormComponent);
export default ProjectForm;
