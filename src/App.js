import React from 'react';
import Element from './element/Element';
import Graph from 'node-dijkstra';

import './styles/styles.scss';
import elementData from './elements.json';
import elementRoutes from './routes.json';

const KEY_CODES = {
	ENTER : 13,
	RIGHT : 39,
	LEFT : 37,
	UP : 38,
	DOWN : 40
};

const route = new Graph(elementRoutes);

export default class App extends React.Component {
		constructor(props) {
			super(props);
			this._handleSelectItem = this._handleSelectItem.bind(this);			
			this._handleOnClick = this._handleOnClick.bind(this);
			this._handleKeyUp = this._handleKeyUp.bind(this);
			this._handleMoveByArrow = this._handleMoveByArrow.bind(this);
			this._getElementById = this._getElementById.bind(this);
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
		
		_handleSelectItem(nextId, mouse = false) {
			if (mouse) {
				if (!this._trySelectByMouse(nextId))
					return;
			}			
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
					return;
			}
		}

		_handleMoveByArrow(direction) {
			let nextItemId = elementData.filter(function (e) {
				return e.id == this.state.selectedId;
			}.bind(this)).map(o => o[direction])[0];

			if (nextItemId != undefined )		
				this._handleSelectItem(nextItemId);
		}

		_getElementById(id) {
			return elementData.filter(function (e) {
				return e.id == id;
			})[0]; 
		}

		_trySelectByMouse(focusedId) {			
			let curElement = this._getElementById(this.state.selectedId);
			let focusedElement = this._getElementById(focusedId);
			return route.path(curElement.id, focusedElement.id);
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

