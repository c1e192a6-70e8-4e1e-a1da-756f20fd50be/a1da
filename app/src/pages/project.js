import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import ProjectForm from '../forms/project';
import get from 'lodash/get';
import { apiBase } from '../settings';
import { toast } from 'react-toastify';

export class ProjectDetailPageComponent extends Component {
    state = {
        fetching: true,
        ready: false,
        notFound: false,
        data: undefined,
    };

    static propTypes = {
        projectId: PropTypes.string.isRequired,
        logined: PropTypes.bool.isRequired,
        currentUserId: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
    };

    renderNotFound() {
        return (
            <div className="page-content center">
                <div style={{ textAlign: 'center' }}>
                    <h1>Project Not found</h1>
                    <p>The project your are looking for is missing </p>
                    <CircularProgress />
                    <p>And the globe keeps spining </p>
                    <h1>&nbsp;</h1>
                </div>
            </div>
        );
    }

    fetchData() {
        fetch(apiBase + '/projects/' + this.props.projectId, {
            credentials: 'with',
        })
            .then(response => {
                if (response.ok) return response.json();
                let error = new Error(response.statusText);
                error.status = response.status;
                throw error;
            })
            .then(data => this.setState({ data, ready: true }))
            .catch(error => {
                toast.error(error.message);
                if (error.status === 404)
                    this.setState({
                        ready: true,
                        notFound: true,
                    });
            });
    }

    componentWillMount = () => {
        if (!this.state.ready) this.fetchData();
    };

    handleSubmit = formValues => {
        return new Promise(resolve =>
            fetch(apiBase + '/projects/' + formValues.id, {
                credentials: 'with',
                method: 'PUT',
                body: JSON.stringify(formValues),
                headers: {
                    'content-type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) return response.json();
                    return Promise.reject(Error(response.statusText));
                })
                .then(data => {
                    this.setState({ data });
                    toast.success('Project saved');
                    resolve();
                })
                .catch(error => {
                    toast.error(error.message);
                    resolve();
                })
        );
    };

    renderForm = () => {
        return (
            <div className="page-content center">
                <ProjectForm
                    onSubmit={this.handleSubmit}
                    initialValues={this.state.data}
                    editable={this.canEditProject()}
                />
            </div>
        );
    };

    canEditProject = () => {
        const project = get(this.state, 'data');
        return (
            project &&
            // Only Logined User can edit
            this.props.logined &&
            // Only Owner Can edit
            project.ownerId === this.props.currentUserId &&
            // Only when not expired.
            !this.isExpired(project)
            // Guess should not be editable when is Finished but Nevermind...
            // &&
        );
    };

    isExpired(project) {
        return project.status === 'unfinished' && +new Date() - +new Date(project.startDate) > 86400 * 1000 * 3;
    }

    render() {
        if (!this.state.ready)
            return (
                <div className="page-content center">
                    <CircularProgress />
                </div>
            );

        if (this.state.notFound) return this.renderNotFound();

        return this.renderForm();
    }
}

const mapStateToProps = (state, ownProps) => {
    // get Project Id from Router match
    const projectId = get(ownProps, 'match.params.projectId');
    return {
        projectId,
        logined: state.user.logined,
        currentUserId: state.user.id,
    };
};

export const ProjectDetailPage = connect(mapStateToProps)(ProjectDetailPageComponent);

export default ProjectDetailPage;
