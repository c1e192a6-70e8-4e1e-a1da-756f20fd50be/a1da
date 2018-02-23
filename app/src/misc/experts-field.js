import React, { Component } from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import without from 'lodash/without';
import union from 'lodash/union';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ExpertName from './expert-name';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Done, Clear, Delete } from 'material-ui-icons';
import { apiBase } from '../settings';
import { toast } from 'react-toastify';

export class ExpertsField extends Component {
    static propTypes = {
        input: PropTypes.shape({
            value: PropTypes.shape({
                related: PropTypes.array,
                approved: PropTypes.array,
                rejected: PropTypes.array,
            }),
        }),
        disabled: PropTypes.bool,
    };

    state = {
        editing: false,
        dataSource: [],
    };

    addExpert = expertId => {
        const { input: { value, onChange }, disabled } = this.props;
        if (disabled) return;
        if (!includes(this.props.input.value.related, expertId)) {
            onChange({
                ...value,
                related: union([expertId], value.related),
            });
        }
    };

    removeExpert = expertId => {
        const { input: { value, onChange }, disabled } = this.props;
        if (disabled) return;
        if (includes(this.props.input.value.related, expertId)) {
            onChange({
                related: without(value.related, expertId),
                approved: without(value.approved, expertId),
                rejected: without(value.rejected, expertId),
            });
        }
    };

    approveExpert = expertId => {
        const { input: { value, onChange }, disabled } = this.props;
        if (disabled) return;
        if (includes(this.props.input.value.related, expertId)) {
            onChange({
                related: value.related,
                approved: union([expertId], value.approved),
                rejected: without(value.rejected, expertId),
            });
        }
    };

    rejectExpert = expertId => {
        const { input: { value, onChange }, disabled } = this.props;
        if (disabled) return;
        if (includes(this.props.input.value.related, expertId)) {
            onChange({
                related: value.related,
                approved: without(value.approved, expertId),
                rejected: union([expertId], value.rejected),
            });
        }
    };

    isApproved = expertId => {
        const { input: { value } } = this.props;
        return includes(value.approved, expertId);
    };

    isRejected = expertId => {
        const { input: { value } } = this.props;
        return includes(value.rejected, expertId);
    };

    canRemoveExpert = expertId => !includes(this.props.input.value.approved, expertId);

    componentWillMount = () => {
        // Fetch all experts for quick autocomplete - Simplified
        fetch(apiBase + '/experts')
            .then(response => {
                if (response.ok) return response.json();
                let error = new Error(response.statusText);
                error.status = response.status;
                throw error;
            })
            .then(data => this.setState({ dataSource: data }))
            .catch(error => {
                toast.error(error.message);
            });
    };

    handleUpdateInput = searchText => {
        this.setState({
            searchText: searchText,
        });
    };

    handleAddExpert = expertRecord => {
        this.addExpert(expertRecord.id);
        this.setState({ searchText: '' });
    };
    renderRow = () => {
        const { input: { value } } = this.props;
        return value.related.map(expertId => {
            const isApproved = this.isApproved(expertId);
            const isRejected = this.isRejected(expertId);
            return (
                <TableRow key={expertId}>
                    <TableRowColumn>
                        <ExpertName expertId={expertId} />
                    </TableRowColumn>
                    <TableRowColumn>
                        <FloatingActionButton
                            mini
                            backgroundColor={isApproved ? 'rgb(0, 188, 212)' : '#888'}
                            label={isApproved ? 'Approved' : 'Approve'}
                            style={{ marginRight: 15 }}
                            onClick={() => this.approveExpert(expertId)}
                        >
                            <Done />
                        </FloatingActionButton>
                        <FloatingActionButton
                            mini
                            backgroundColor={isRejected ? 'rgb(0, 188, 212)' : '#888'}
                            label={isRejected ? 'Rejected' : 'Reject'}
                            onClick={() => this.rejectExpert(expertId)}
                        >
                            <Clear />
                        </FloatingActionButton>
                    </TableRowColumn>
                    {!this.props.disabled && (
                        <TableRowColumn>
                            <FlatButton
                                label="Remove"
                                disabled={isApproved}
                                secondary
                                icon={<Delete />}
                                onClick={() => this.removeExpert(expertId)}
                            />
                        </TableRowColumn>
                    )}
                </TableRow>
            );
        });
    };
    render() {
        return (
            <div>
                <AutoComplete
                    dataSource={this.state.dataSource}
                    searchText={this.state.searchText}
                    onUpdateInput={this.handleUpdateInput}
                    onNewRequest={this.handleAddExpert}
                    floatingLabelText="Add Expert"
                    dataSourceConfig={{ value: 'id', text: 'name' }}
                    maxSearchResults={5}
                    filter={AutoComplete.fuzzyFilter}
                    openOnFocus={true}
                    fullWidth
                    disabled={this.props.disabled}
                />
                <Table selectable={false} height="220px">
                    <TableHeader displaySelectAll={false} displayRowCheckbox={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Expert Name</TableHeaderColumn>
                            <TableHeaderColumn>Approval</TableHeaderColumn>
                            {!this.props.disabled && <TableHeaderColumn>&nbsp;</TableHeaderColumn>}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>{this.renderRow()}</TableBody>
                </Table>
            </div>
        );
    }
}

export default ExpertsField;
