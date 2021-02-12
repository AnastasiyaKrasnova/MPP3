import React from 'react';

import TaskEditor from './TaskEditor.jsx'
import TaskGrid from './TaskGrid.jsx'
import TaskFilter from './TaskFilter.jsx'
import TasksStore from '../stores/TasksStore.js'
import TaskActions from '../actions/TaskActions';


import '../styles/App.less';

function getStateFromFlux() {
    return {
        isLoading: TasksStore.isLoading(),
        tasks: TasksStore.getTasks()
    };
}

class App extends React.Component{

    constructor (props){
        super(props);

        const info=getStateFromFlux();
        this.state={
            editTask: null,
            tasks:info.tasks,
            isLoading:info.isLoading
        }
        this.props.isEditing=false;
        this._onChange=this._onChange.bind(this);
        this.handleNoteEdit=this.handleNoteEdit.bind(this);
        this.handleNoteUpdate=this.handleNoteUpdate.bind(this);
        this.handleNoteDelete=this.handleNoteDelete.bind(this);
    }

    componentWillMount() {
        TaskActions.loadTasks()
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
    }

    handleNoteDelete(task) {
        this.props.isEditing=false;
        TaskActions.deleteTask(task.id);
        
    }

   handleNoteAdd(taskdata){
        TaskActions.createTask(taskdata);
   }

   handleNoteUpdate(taskdata){
       this.props.isEditing=false;
        TaskActions.updateTask(taskdata);

   }

   handleNoteEdit(task){
       this.props.isEditing=true;
        this.setState({editTask: task});
    }

    handleFileDownload(filename,id){
        TaskActions.downloadFile(filename,id);
     }

    handleFileDelete(filename,id){
        console.log("Aaaaaaaaaaa")
        TaskActions.deleteFile(filename,id);
     }

   handleFiltering(status){
       TaskActions.filterTask(status);
   }

   handleReturning(){
        TaskActions.loadTasks()
   }
    render(){
        console.log('render')
        let editor;
        if (!this.props.isEditing) {
            editor= <TaskEditor renew={true} onNoteAdd={this.handleNoteAdd} />;
          } else {
            editor =<TaskEditor renew={true} task={this.state.editTask} onFileDownload={this.handleFileDownload} onFileDelete={this.handleFileDelete}  onNoteAdd={this.handleNoteUpdate}/>;
          }
        return (
            <div className='App'>
                <h2 className='App__header'>Task Sheduler</h2>
                {editor}
                <TaskFilter onFiltering={this.handleFiltering} onReturn={this.handleReturning}/>
                <TaskGrid tasks={this.state.tasks} onNoteDelete={this.handleNoteDelete} onNoteEdit={this.handleNoteEdit} />
            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
};



export default App;