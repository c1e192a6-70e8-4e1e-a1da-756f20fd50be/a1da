import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UserEmailComponent = props => {
    if (props.user.email)
        return <span style={{ height: 50, lineHeight: '50px', color: 'white' }}>{props.user.email}</span>;
    return null;
};

UserEmailComponent.propTypes = {
    user: PropTypes.object,
};

const mapStateToProps = state => ({
    user: state.user.user || {},
});

export const UserEmail = connect(mapStateToProps)(UserEmailComponent);
