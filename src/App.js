import React from 'react';
import Element from './element/Element';

import './styles/styles.scss';
import elementData from './elements.json';

const KEY_CODES = {
	ENTER : 13,
	RIGHT : 39,
	LEFT : 37,
	UP : 38,
	DOWN : 40
};

export default class App extends React.Component {
		constructor(props) {
			super(props);
			this._handleSelectItem = this._handleSelectItem.bind(this);			
			this._handleOnClick = this._handleOnClick.bind(this);
			this._handleKeyUp = this._handleKeyUp.bind(this);
		}

		state = {
			selectedId: elementData[0].id
		}

		componentDidMount() {
			document.addEventListener("keyup", this._handleKeyUp);			
		}

		componentWillUnmount() {
			document.removeEventListener("keyup", this._handleKeyUp);
		}
		
		_handleSelectItem(nextId) {		
			this.setState({selectedId: nextId});
		}

		_handleOnClick() {
			console.log('Click at rect with id', this.state.selectedId);
		}

		_handleKeyUp(e) {
			switch (e.keyCode) {
				case KEY_CODES.ENTER:
					this._handleOnClick();
					break;
				case KEY_CODES.RIGHT:					
					this._handleMoveByArrow("EnableRight");
					break;
				case KEY_CODES.LEFT:					
					this._handleMoveByArrow("EnableLeft");
					break;
				case KEY_CODES.UP:					
					this._handleMoveByArrow("EnableUp");
					break;
				case KEY_CODES.DOWN:					
					this._handleMoveByArrow("EnableDown");
					break;										
				default:
					console.log('can not parsed key code');
			}
		}

		_handleMoveByArrow(direction) {
			let nextItemId = elementData.filter(function (e) {
				return e.id == this.state.selectedId;
			}.bind(this)).map(o => o[direction])[0];

			if (nextItemId != undefined )		
				this._handleSelectItem(nextItemId);
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

