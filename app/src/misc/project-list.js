import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { apiBase } from '../settings';
import queryString from 'query-string';
import LinearProgress from 'material-ui/LinearProgress';
import { Link } from 'react-router-dom';
import moment from 'moment';
import get from 'lodash/get';
import ExpertName from './expert-name';
import Avatar from 'material-ui/Avatar';

class ProjectList extends Component {
    state = {
        fetching: true,
        data: [],
    };
    static propTypes = {
        whereQuery: PropTypes.object,
    };
    static defaultProps = {
        whereQuery: {},
    };
    fetchData = () => {
        fetch(apiBase + '/projects?' + queryString.stringify({ where: JSON.stringify(this.props.whereQuery) }), {
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) return response.json();
                let error = new Error(response.statusText);
                error.status = response.status;
                throw error;
            })
            .then(data => this.setState({ data, fetching: false }))
            .catch(() => this.setState({ fetching: false, data: [] }));
    };
    componentWillMount() {
        this.fetchData();
    }
    renderRows = () => {
        if (!this.state.data.length)
            return (
                <TableRow>
                    <TableRowColumn>No Content</TableRowColumn>
                </TableRow>
            );
        return this.state.data.map(project => {
            const approvedExperts = get(project, 'experts.approved', []);
            return (
                <TableRow key={project.id}>
                    <TableRowColumn style={{ width: 250 }}>
                        <Link to={'/projects/' + project.id}>{project.title}</Link>
                    </TableRowColumn>
                    <TableRowColumn style={{ width: 200 }}>{moment(project.startDate).format('LL LT')}</TableRowColumn>
                    <TableRowColumn style={{ width: 100 }}>{project.status}</TableRowColumn>
                    <TableRowColumn>
                        {approvedExperts.map(expertId => (
                            <Link
                                key={expertId}
                                to={'/experts/' + expertId}
                                onClick={e => e.preventDefault()}
                                title="Link to /experts/:expertId (not implemented)"
                            >
                                <Avatar backgroundColor={'#' + expertId.slice(-3)} style={{ marginRight: 5 }}>
                                    <ExpertName key={expertId} expertId={expertId} length={1} />
                                </Avatar>
                            </Link>
                        ))}
                    </TableRowColumn>
                </TableRow>
            );
        });
    };
    render() {
        return (
            <React.Fragment>
                {this.state.fetching && <LinearProgress mode="indeterminate" />}
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} displayRowCheckbox={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{ width: 250 }}>Title</TableHeaderColumn>
                            <TableHeaderColumn style={{ width: 200 }}>StartDate</TableHeaderColumn>
                            <TableHeaderColumn style={{ width: 100 }}>Status</TableHeaderColumn>
                            <TableHeaderColumn>Approved Experts</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>{this.renderRows()}</TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default ProjectList;
