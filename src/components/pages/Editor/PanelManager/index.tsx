/* tslint:disable:no-var-requires */
import * as React from 'react';

let Split: any = null;
if (typeof window !== 'undefined') {
	Split = require('split.js');
}

import Panel from './Panel';
import { Container } from './Styles';

import { getIdSequence } from '@utils';

interface IPanel {
	title: string;
	node: React.ReactNode;
}

interface IPropTypes {
	panels: IPanel[];
}

class PanelManager extends React.Component<IPropTypes> {

	public componentDidMount() {
		const elements = this.getPanelIds(this.props.panels.length, true);

		const options = {
			gutterSize: 2,
			minSize: 200,
			direction: 'vertical',
			elementStyle: (_: 'width' | 'height', 
			size: number, gutterSize: number) => ({
				'height': `calc(${size}% - ${gutterSize}px)`
			}),
			gutterStyle: (_: 'width' | 'height', gutterSize: number) => ({
				'height': `${gutterSize}px`
			})
		};

		Split(elements, options);
	}

	/*
	* Returns an array of ids to be used for the children.
	*/
	private getPanelIds(quantity: number, hasHash: boolean = false): string[] {
		const ids = getIdSequence(quantity, 'panelmanager-panel');

		return hasHash 
			? ids.map((id) => `#${id}`)
			: ids; 
	}  

	public render() {
		const panelIds = this.getPanelIds(this.props.panels.length);

		return (
			<Container>
				{this.props.panels.map(({node, title}, index) =>
					Panel({
						child: node,
						title,
						id: panelIds[index]
					}))}
			</Container>  
		);
	}

}

export default PanelManager;