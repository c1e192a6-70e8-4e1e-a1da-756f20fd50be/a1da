import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ProjectList from '../misc/project-list';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class DashboardPageComponent extends Component {
    render() {
        const props = this.props;
        if (!props.logined) return <Redirect to={'/login'} />;
        return (
            <div className="page-content" style={{ padding: 20 }}>
                <Paper>
                    <Toolbar>
                        <ToolbarTitle text="New Projects" />
                    </Toolbar>
                    <ProjectList whereQuery={{ status: 'new' }} />
                </Paper>
                <Paper style={{ marginTop: 20 }}>
                    <Toolbar>
                        <ToolbarTitle text="Pending Projects" />
                    </Toolbar>
                    <ProjectList
                        whereQuery={{
                            status: 'unfinished',
                            startDate: {
                                $gt: new Date(+new Date() - 86400 * 1000 * 3).toISOString(),
                            },
                        }}
                    />
                </Paper>
                <Paper style={{ marginTop: 20 }}>
                    <Toolbar>
                        <ToolbarTitle text="Expired Projects" />
                    </Toolbar>
                    <ProjectList
                        whereQuery={{
                            status: 'unfinished',
                            startDate: {
                                $lt: new Date(+new Date() - 86400 * 1000 * 3).toISOString(),
                            },
                        }}
                    />
                </Paper>
            </div>
        );
    }
}
const mapStateToProps = state => ({ logined: state.user.logined });
export const DashboardPage = connect(mapStateToProps)(DashboardPageComponent);
export default DashboardPage;
