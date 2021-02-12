import React from 'react';
import '../styles/Task.less';
import moment from 'moment'

class Task extends React.Component{
    render() {
        const style = { backgroundColor: this.props.color };
        return (
            <div className='Note' style={style}>
                <span className='Note__del-icon' onClick={this.props.onDelete}> × </span>
                <span className='Note__modif-icon' onClick={this.props.onEdit}> M </span>
                <h4 className='Note__title'>{this.props.title}</h4>
                <h5 className='Note__title'>{moment(this.props.start_date).format('yyyy-MM-DD')}</h5>
                <h5 className='Note__title'>{moment(this.props.stop_date).format('yyyy-MM-DD')}</h5>
                <h4 className='Note__text'>Uploaded files</h4>
                {
                    
                    this.props.files_list.map((item, i)=>{
                        return (<h5 className='Note__text'>{item}</h5>)
                    })
                }
                <div className='Note__text'>{this.props.children}</div>
            </div>
        );
    }
};

export default Task;