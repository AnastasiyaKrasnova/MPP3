import React from 'react';
import DatePicker from 'react-datepicker'
import "../styles/react-datepicker.css"
import ColorPicker from './ColorPicker.jsx'
import FileUpload from './FileUploader.jsx';
import '../styles/TaskEditor.less'
import moment from 'moment'

const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']
let count=0;

class TaskEditor extends React.Component{

    constructor (props){
        super(props);
        this.state={
            title:'',
            text:'',
            file:[],
            files_list:[],
            color: COLORS[0],
            start_date: new Date(),
            stop_date: new Date(),
            button_name: "Add",
            tasks: []
        }
        this.handleFileChange=this.handleFileChange.bind(this);
        this.handleNoteAdd=this.handleNoteAdd.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleColorChange=this.handleColorChange.bind(this);
        this.handleStartDateChange=this.handleStartDateChange.bind(this);
        this.handleStopDateChange=this.handleStopDateChange.bind(this);
        this.handleFileDelete=this.handleFileDelete.bind(this);
        this.handleFileDeleteGlobal=this.handleFileDeleteGlobal.bind(this);
    };

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    };

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    };

    handleStartDateChange(date) {
        this.setState({ start_date: date})
    };
    handleStopDateChange(date) {
        this.setState({ stop_date: date})
    };

    handleColorChange(color) {
        this.setState({ color });
    };

    handleColorChange(color) {
        this.setState({ color });
    };

    handleFileDelete(item) {
        const fl=this.state.files_list;
        const index = fl.indexOf(item);
        if (index > -1)
            fl.splice(index, 1);
        
        const f=this.state.file;
        f.splice(index-count, 1);
        this.setState({file:f, files_list: fl});
    };

    handleFileDeleteGlobal(filename,id) {
        count=count-1;
        this.props.onFileDelete(filename,id)
        this.handleFileDelete(filename);
        
    };

    handleFileChange(event){
        const file = event.target.files[0];
        const nf=this.state.file;
        nf.push(file);
        const f=this.state.files_list;
        if(f.indexOf(file.name)==-1)
            f.push(file.name);
        this.setState({file:nf, files_list: f});
    };


    handleNoteAdd() {
        const status=COLORS.indexOf(this.state.color)
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            status: status,
            start_date: moment(this.state.start_date).format('yyyy-MM-DD'),
            stop_date: moment(this.state.stop_date).format('yyyy-MM-DD'),
            file: this.state.file,
            files_list: this.state.files_list
        };
        if (this.props.task){
            newNote.id=this.props.task.id
        }
        this.props.onNoteAdd(newNote);
        this.setState({ text: '', 
                title: '', 
                color: COLORS[0], 
                button_name:"Add", 
                start_date: new Date(),
                stop_date: new Date(),
                files_list:[],
                file: []});
    };

    componentDidUpdate(){
            if (this.props.renew){
                this.props.renew=false;
                if (this.props.task){
                    count=this.props.task.files_list.length
                    this.setState({ text: this.props.task.text, 
                                    title: this.props.task.title, 
                                    color: COLORS[this.props.task.status], 
                                    button_name:"Edit", 
                                    start_date: this.props.task.start_date,
                                    stop_date: this.props.task.stop_date,
                                    files_list:this.props.task.files_list,
                                    file: []});
                }
                else{
                    this.setState({ text: '', 
                                    title: '', 
                                    color: COLORS[0], 
                                    button_name:"Add", 
                                    start_date: new Date(),
                                    stop_date: new Date(),
                                    files_list:[],
                                    file: []});
                }   
            }
        
    };

    render(){
       let listItems,button,onDelete;
        if (this.props.task){
            listItems = this.state.files_list.map((item,i)=> 
            {
                if (i<count){
                    button=<button onClick={this.props.onFileDownload.bind(null, item, this.props.task.id)} >Download</button>
                    onDelete=this.handleFileDeleteGlobal.bind(null,item,this.props.task.id)
                }   
                else {
                    button=null
                    onDelete=this.handleFileDelete.bind(null,item)
                }
                    
                return (<div>
                        <label className='Note__text'>{item}</label>
                        <button onClick={onDelete}>Delete</button>
                       {button}
                </div>)  
                
            });
        }
        else{
            
            listItems = this.state.files_list.map((item,i)=> 
            {
                return( <div>
                    <label className='Note__text'>{item}</label>
                    <button onClick={this.handleFileDelete.bind(null,item)}>Delete</button>
                    </div>)
            });
        }
        
        return (
            <div className='NoteEditor'>
                <input
                    type='text'
                    className='NoteEditor__title'
                    placeholder='Task title'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <textarea
                    placeholder='Task text'
                    rows={5}
                    className='NoteEditor__text'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <FileUpload 
                    onChange={this.handleFileChange}
                />
                <h4>Uploaded earlier: </h4>
                {listItems}
                <DatePicker
                    placeholderText="Beginning of Task"
                    selected={ moment(this.state.start_date).toDate()}
                    onChange={ this.handleStartDateChange }
                    name="startDate"
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    placeholderText="Deadline of Task"
                    selected={ moment(this.state.stop_date).toDate()}
                    onChange={ this.handleStopDateChange }
                    name="stopDate"
                    dateFormat="yyyy-MM-dd"
                />
                <div className='NoteEditor__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
                    <button
                        className='NoteEditor__button'
                        disabled={!this.state.text}
                        onClick={this.handleNoteAdd}
                    >
                        {this.state.button_name}
                    </button>
                </div>
            </div>
        );
    }
};

export default TaskEditor;