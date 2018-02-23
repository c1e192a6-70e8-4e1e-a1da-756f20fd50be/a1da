import './layout.css';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import logo from './assets/logo.png';
import { MainContent } from './main-content-routes';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserEmail } from './misc/user-email';
import { Menu } from './misc/menu';

export class MainLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            drawerOpened: false,
        };
    }
    toggleDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened });
    render() {
        return (
            <React.Fragment>
                <Drawer open={this.state.drawerOpened}>
                    <div style={{ height: 50, backgroundColor: '#5D9595' }} />
                    <Menu />
                </Drawer>
                <div className={this.state.drawerOpened ? 'main-content-wrapper drawer-open' : 'main-content-wrapper'}>
                    <AppBar
                        title="DEMO PROJECT"
                        onLeftIconButtonClick={this.toggleDrawer}
                        iconElementRight={<UserEmail />}
                        iconStyleRight={{
                            marginRight: 0,
                        }}
                    />
                    <MainContent />
                </div>
                <div className="main-logo-watermartk">
                    <img src={logo} />
                </div>
                <ToastContainer />
            </React.Fragment>
        );
    }
}
export default MainLayout;
