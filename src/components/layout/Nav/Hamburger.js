import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import StyledHamburger from './StyledHamburger';
import StyledState from './StyledState';

class Hamburger extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ariaExpanded: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.setState({
			ariaExpanded: !this.state.ariaExpanded
		});
		this.props.onClick(e);
	}

	render() {
		const { ariaControls, isMobileMenuVisible } = this.props;
		const { ariaExpanded } = this.state;
		return (
			<StyledHamburger
				role="button"
				aria-controls={ariaControls}
				aria-expanded={ariaExpanded}
				isMobileMenuVisible={isMobileMenuVisible}>
				<StyledState onChange={this.handleClick} />
	 			<div aria-hidden="true">
	 				<span></span>
	 			</div>
			</StyledHamburger>
		);
	}

}

Hamburger.propTypes = {
	ariaControls: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isMobileMenuVisible: PropTypes.bool.isRequired
};

export default Hamburger;