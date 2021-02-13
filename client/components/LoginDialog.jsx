import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class LoginDialog extends React.Component{

    constructor (props){
        super(props);
        this.state={
           email:'',
           password:''
        }
        this.handleEmailChange=this.handleEmailChange.bind(this);
        this.handlePassChange=this.handlePassChange.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
        this.props.onLogIn(newUser);
        this.setState({email:'',password:''})
    };

    handleRegister(){
        this.props.onRegister()
        this.setState({email:'',password:''})
    }
    render(){
        let error
        if (this.props.error.status==406)
            error="Login or password is uncorrect"

        return(<div>
                    <Dialog open={this.props.open} aria-labelledby="form-dialog-title">
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
                                {error}
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
                </div>)
    }
}

export default LoginDialog;