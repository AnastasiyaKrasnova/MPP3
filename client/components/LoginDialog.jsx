import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RegisterDialog from './RegisterDialog.jsx'


class LoginDialog extends React.Component{

    constructor (props){
        super(props);
        this.state={
           email:'',
           password:'',
           register: false,
           error:null
        }
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePassChange=this.handlePassChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    handlePassChange(event) {
        this.setState({ password: event.target.value });
    };

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    };

    handleLogIn() {
        const newUser = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.LogIn(newUser)
        this.setState({email:'',password:''})
    };

    handleRegister(){
        this.props.error=null
        this.props.open_register=true
        this.setState({email:'',password:''})
    }

    handleBack(){
        this.props.open_register=false
        this.props.error=null
        this.setState({email:'',password:''})
    }

    setErrorMessage(){
        let login, register
        if (this.props.error){
            if ((this.props.error.status==401 && this.props.error.text!="Access denied")){
                login=this.props.error.text
            }
            if (this.props.error.status==406){
                register=this.props.error.text
            }
        } 
        return {login,register}
    }

    render(){
        let res=this.setErrorMessage()
        let error_login=res.login
        let error_register=res.register

        return(<div>
                    <Dialog open={this.props.open_login} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To browse or edit task content you need to be authorized
                            </DialogContentText>
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
                                {error_login}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleLogIn} color="primary">
                                Log In
                            </Button>
                            <Button onClick={this.handleRegister} color="primary">
                                Register
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <RegisterDialog error={error_register} open={this.props.open_register} onRegister={this.props.onRegister} onBack={this.handleBack} />
                </div>)
    }
}

export default LoginDialog;