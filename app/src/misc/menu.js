import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
const MenuComponent = ({ logined, dispatch }) => {
    if (logined)
        return (
            <React.Fragment>
                <Link to="/dashboard">
                    <MenuItem primaryText="Dashboard" />
                </Link>
                <MenuItem primaryText="Logout" onClick={() => dispatch({ type: 'LOGOUT' })} />
            </React.Fragment>
        );
    return (
        <React.Fragment>
            <Link to="/">
                <MenuItem primaryText="login" />
            </Link>
            <Link to="/signup">
                <MenuItem primaryText="Sign up" />
            </Link>
        </React.Fragment>
    );
};
MenuComponent.propTypes = {
    dispatch: PropTypes.func,
    logined: PropTypes.bool,
};
const mapStateToProps = state => ({
    logined: state.user.logined,
});

export const Menu = connect(mapStateToProps)(MenuComponent);
