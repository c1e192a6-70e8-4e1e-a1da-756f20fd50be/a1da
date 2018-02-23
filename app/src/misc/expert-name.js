import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

export class ExpertName extends Component {
    static propTypes = {
        expertId: PropTypes.string.isRequired,
        name: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        length: PropTypes.number,
    };
    constructor(props) {
        super(props);
        if (!props.name)
            props.dispatch({
                type: 'FETCH_EXPERT',
                payload: props.expertId,
            });
    }
    render() {
        if (!this.props.name) return '...';
        if (this.props.length) return this.props.name.slice(0, this.props.length);
        return this.props.name;
    }
}
const mapStateToProps = (state, ownProps) => ({
    name: state.data.experts[ownProps.expertId] ? state.data.experts[ownProps.expertId].name : undefined,
});
export default connect(mapStateToProps)(ExpertName);
