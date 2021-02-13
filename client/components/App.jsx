import React from 'react';

import TaskEditor from './TaskEditor.jsx'
import TaskGrid from './TaskGrid.jsx'
import TaskFilter from './TaskFilter.jsx'
import LoginDialog from './LoginDialog.jsx'
import RegisterDialog from './RegisterDialog.jsx'
import TasksStore from '../stores/TasksStore.js'
import TaskActions from '../actions/TaskActions';


import '../styles/App.less';

function getStateFromFlux() {
    return {
        isLoading: TasksStore.isLoading(),
        tasks: TasksStore.getTasks(),
        error:{
            status: TasksStore.getError().error_status,
            text: TasksStore.getError().error_text
        }
    };
}

const MODE=Object.freeze({REGISTER:2, LOGIN:1, ELSE:0})

class App extends React.Component{

    constructor (props){
        super(props);

        const info=getStateFromFlux();
        this.state={
            editTask: null,
            tasks:info.tasks,
            error:info.error,
            mode: MODE.ELSE
        }
        this.props.isEditing=false;
        this._onChange=this._onChange.bind(this);
        this.handleNoteEdit=this.handleNoteEdit.bind(this);
        this.handleNoteUpdate=this.handleNoteUpdate.bind(this);
        this.handleNoteDelete=this.handleNoteDelete.bind(this);
        this.handleLogIn=this.handleLogIn.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
        this.handleRegisterSwitch=this.handleRegisterSwitch.bind(this);
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
        TaskActions.deleteFile(filename,id);
     }

   handleFiltering(status){
       TaskActions.filterTask(status);
   }

   handleReturning(){
        TaskActions.loadTasks()
   }

   handleLogIn(user){
       TaskActions.login(user)
       this.setState({mode: MODE.LOGIN})
   }

   handleRegister(user){
        TaskActions.register(user)
        this.setState({mode: MODE.REGISTER})

   }

   handleRegisterSwitch(){
    this.setState({mode: MODE.LOGIN})

}

    render(){
        /*let editor,open=false, register=false;
        if ((this.state.error.status==401)){
            open=true
        }
        else if ((this.state.error.status==406) && MODE.LOGIN){
            register=true
        }

        else if (this.state.error==0 && mode.REGISTER){
            open=true
        } */


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
                <LoginDialog error={this.state.error} open={open} onLogIn={this.handleLogIn} onRegister={this.handleRegisterSwitch} />
                <RegisterDialog error={this.state.error} open={register} onRegister={this.handleRegister} />

            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
};



export default App;