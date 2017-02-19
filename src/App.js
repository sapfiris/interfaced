import React from 'react';
import Element from './element/Element';``

import './styles/styles.scss';
import elementData from './elements.json';

export default class App extends React.Component {
		constructor(props) {
			super(props);
			this._handleSelectItem = this._handleSelectItem.bind(this);			
			this._handleOnClick = this._handleOnClick.bind(this);
		}

		state = {
			selectedId: elementData[0].id
		}

		componentDidMount() {
					
		}

		componentWillUnmount() {

		}
		
		_handleSelectItem(nextId) {		
			this.setState({selectedId: nextId});
		}

		_handleOnClick() {
			console.log('Click at rect with id', this.state.selectedId);
		}

		render() {
			const elements = elementData.map((o) => {
				return (
					<Element key={o.id} 
						Id={o.id} 
						isSelected={o.id == this.state.selectedId} 
						ElementClick={this._handleOnClick}
						SetSelectedId={this._handleSelectItem} />);
			});

			return (
				<div className="main-container">
					<div className="element-container">							
						{elements}
					</div>
				</div>
			);
		}
}

