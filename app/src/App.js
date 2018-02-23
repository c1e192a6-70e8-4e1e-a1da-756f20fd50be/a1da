import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme } from './mui-theme';

import Layout from './layout';
import { Provider } from 'react-redux';
import { store } from './redux-store';

class App extends Component {
    componentDidMount() {
        store.dispatch({ type: 'STARTUP' });
    }
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <BrowserRouter>
                        <Layout />
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
