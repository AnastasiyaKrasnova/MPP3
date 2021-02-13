import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class RegisterDialog extends React.Component{

    constructor (props){
        super(props);
        this.state={
           isOpen:false,
           email:'',
           password:'',
           first_name: '',
           last_name:''
        }
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePassChange=this.handlePassChange.bind(this);
        this.handleFirstNameChange=this.handleFirstNameChange.bind(this);
        this.handleLastNameChange=this.handleLastNameChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({ first_name: event.target.value });
    };

    handleLastNameChange(event) {
        this.setState({ last_name: event.target.value });
    };

    handlePassChange(event) {
        this.setState({ password: event.target.value });
    };

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    };

    handleRegister() {
        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };
        this.props.onRegister(newUser);
        this.setState({email:'',password:'',first_name:'',last_name:''})
    };

    handleBack(){
        this.props.open=false
        this.setState({email:'',password:'',first_name:'',last_name:''})
    }


    render(){
        return(<div>
                    <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Register</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                label="First Name"
                                value={this.state.first_name}
                                onChange={this.handleFirstNameChange}
                                fullWidth
                            />
                            <TextField
                                label="Last Name"
                                value={this.state.last_name}
                                onChange={this.handleLastNameChange}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                label="Email Address"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                type="email"
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                value={this.state.password}
                                onChange={this.handlePassChange}
                                type="password"
                                fullWidth
                            />
                            <DialogContentText color="red">
                                {this.props.error}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleRegister} color="primary">
                                Register
                            </Button>
                            <Button onClick={this.handleBack} color="primary">
                                Back
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>)
    }
}

export default RegisterDialog;