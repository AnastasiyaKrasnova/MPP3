import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _tasks = [];
let _loadingError = null;
let _isLoading = true;

function formatTask(task) {
    return {
        id: task._id,
        title: task.title,
        text: task.text,
        start_date: task.start_date,
        stop_date: task.stop_date,
        status: task.status,
        files_list:task.files_list
    }
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getTasks() {
        return _tasks;
    },

    getError() {
        if (_loadingError)
            return {
                error_status: _loadingError.status,
                error_text: _loadingError.data
            }
        else
            return{
                error_status: 0,
                error_text: ''
            }
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_TASKS_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TASKS_SUCCESS: {
            _isLoading = false;
            _tasks = action.tasks.map(formatTask);
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TASKS_FAIL: {
            console.log(action.error)
            _loadingError = action.error;
            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;