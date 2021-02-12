import React from 'react';
import Task from './Task.jsx';

import Masonry from 'react-masonry-component';

import '../styles/TaskGrid.less';

class TaskGrid extends React.Component{
    render() {
        const masonryOptions = {
            itemSelector: '.Note',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

        const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']
        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    this.props.tasks.map(task =>
                        <Task
                            key={task.id}
                            title={task.title}
                            start_date={task.start_date}
                            stop_date={task.stop_date}
                            files_list={task.files_list}
                            onDelete={this.props.onNoteDelete.bind(null, task)}
                            onEdit={this.props.onNoteEdit.bind(null, task)}
                            color={COLORS[task.status]}
                        >
                            {task.text}
                        </Task>
                    )
                }
            </Masonry>
        );
    }
};

export default TaskGrid;