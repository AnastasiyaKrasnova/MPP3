import React from 'react';
import ColorPicker from './ColorPicker.jsx'
import '../styles/TaskEditor.less'

class TaskFilter extends React.Component{
    constructor (props){
        super(props);
        this.state={
            status: 0
        }
        this.handleColorChange=this.handleColorChange.bind(this);
        this.handleFiltering=this.handleFiltering.bind(this);
        
    };

    handleColorChange(color) {
        this.setState({ color });
    };

    handleFiltering() {
        const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']
        const status=COLORS.indexOf(this.state.color)
        this.props.onFiltering(status);
        this.setState({ color: '#FF8A80' });
    };

    render(){
        return (
            <div className='NoteEditor'>
                <div className='NoteEditor__footer'>
                    <label
                    className='NoteEditor__title'>
                        Filter by status
                    </label>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
                    <button
                        className='NoteEditor__button'
                        onClick={this.handleFiltering}
                    >
                        Filter
                    </button>
                    <button
                        className='NoteEditor__button'
                        onClick={this.props.onReturn}
                    >
                        All
                    </button>
                </div>
            </div>
        );
    }
};

export default TaskFilter;