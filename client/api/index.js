import axios from 'axios';
import {apiPrefix} from '../../api_config.json';

export default {
    loadTasks() {
        return axios.get(`${apiPrefix}/tasks`);
    },

    createTask(data) {

        return axios.post(`${apiPrefix}/tasks`, data);
    },

    deleteTask(id) {
        return axios.delete(`${apiPrefix}/tasks?id=${id}`);
    },

    filterTask(status){
        return axios.get(`${apiPrefix}/tasks?status=${status}`);
    },

    updateTask(data){

        return axios.put(`${apiPrefix}/tasks`, data);
    },

    uploadFile(formData,id){
            return axios.post(`${apiPrefix}/tasks/files?id=${id}`, formData);
    },

    downloadFile(filename,id){
        return axios.post(`${apiPrefix}/tasks/download?filename=${filename}&id=${id}`);
    },

    deleteFile(filename,id){
        return axios.delete(`${apiPrefix}/tasks/files?filename=${filename}&id=${id}`);
    },

    login(user){
        return axios.post(`${apiPrefix}/login`,user);
    },

    register(user){
        return axios.post(`${apiPrefix}/register`,user);
    }

}