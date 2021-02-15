import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';
import download from 'js-file-download';

const TaskActions = {
    loadTasks() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_REQUEST
        });

        api.loadTasks()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_SUCCESS,
                tasks: data
            })
        )
        .catch((err) =>{
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        }
            
        );
    },

    createTask(note) {
        api.createTask(note)
        .then((res)=>{
            console.log(note.file)
            this.loadTasks()
            note.file.map((item,i)=>{
                const formData = new FormData();        
                formData.append('file', item);
                api.uploadFile(formData,res.data._id).
                catch(err =>
                    console.error(err)
            );
            })     
            
        }).catch(err =>  
            AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_FAIL,
            error: err.response
        }))

    },

    deleteTask(noteId) {
        api.deleteTask(noteId)
        .then(() =>
            this.loadTasks()
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        );
    },

    updateTask(note) {
        note.file.map((item,i)=>{
            const formData = new FormData();        
            formData.append('file', item);
            console.log(note)
            api.uploadFile(formData,note.id)
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_TASKS_FAIL,
                    error: err.response
                })
            );
        })     
        api.updateTask(note)
        .then(() =>
            this.loadTasks()
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        );

    },

    filterTask(status){

        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_REQUEST
        });

        api.filterTask(status)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_SUCCESS,
                tasks: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        );
    },

    downloadFile(filename,id){
        api.downloadFile(filename,id)
        .then(res => {
            download(res.data, filename);
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        });
    },

    deleteFile(filename,id){
        api.deleteFile(filename,id)
        .catch(err => {
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        });
    },

    login(user){
        api.login(user)
        .then(() =>
        this.loadTasks()
        )
        .catch(err => {
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        });
    },

    register(user){
        api.register(user)
        .then(() =>
        this.loadTasks()
        )
        .catch(err => {
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err.response
            })
        });
    }
};

export default TaskActions;