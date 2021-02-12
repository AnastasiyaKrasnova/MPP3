import React from 'react';
import '../styles/FileUploader.css';

class FileUploader extends React.Component{

    render(){
        return (
            <div>
                <input type="file" onChange={this.props.onChange.bind(null)} />                
            </div>
        );
    }
    
}
export default FileUploader;