import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { ProjectDetailPage } from './pages/project';
import { DashboardPage } from './pages/dashboard';
import { SignUpPage } from './pages/signup';
export const MainContent = props => (
    <Switch>
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/projects/:projectId" component={ProjectDetailPage} />
        <Route path="/" component={LoginPage} {...props} />
    </Switch>
);
