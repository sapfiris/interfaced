import React from 'react';
import classNames from 'classnames/bind';
import './Element.scss';

class Element extends React.Component {
    static propTypes = {
        Id: React.PropTypes.string.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        ElementClick: React.PropTypes.func.isRequired,
        SetSelectedId: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this._handleMouseHover = this._handleMouseHover.bind(this);
    }

    componentDidMount() {
        this.refs.el.addEventListener("mouseover", this._handleMouseHover);   
    }
    componentWillUnmount() {     
        this.refs.el.removeEventListener("mouseover", this._handleMouseHover);        
    }

    _handleMouseHover() {
        this.props.SetSelectedId(this.props.Id);
    }

    render() {
        let classes = classNames({
            "item": true,           
            "active": this.props.isSelected
        }, "el_" + this.props.Id);        
        return (
            <div ref="el" key={this.props.Id}                    
                    className={classes}
                    onClick={this.props.ElementClick}/>);
    }
}

export default Element;
