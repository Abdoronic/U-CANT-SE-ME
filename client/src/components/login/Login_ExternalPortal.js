import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import { Redirect } from 'react-router-dom'

const { serverURI } = require("../../config/keys");

class ExternalLogin extends Component {
    state = {
        email: '',
        password: '',
        id: '',
        showPassword: false,
        forgot: false,
        signUp: false
    }
    handleSubmit = async () => {
        const req = {
            email: this.state.email,
            password: this.state.password
        }
        try{
            let res = await axios.post(serverURI + '/investors/login', req)
            document.getElementById('Error').style.display = 'none'
            this.setState({
                id: res.data._id
            })
        }
        catch(error){
            document.getElementById('Error').style.display = 'inline'
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    }

render(){
    const styles = {
        error: {
            display: 'none'
        },
        label: {
            width: '35%',
            margin: 'auto'
        }
    }
    return(
    <div>
        <br />
        <br />
        <h3 class="text-center text-info">Login</h3>
        <br />

        <FormControl>    
            <InputLabel>Email</InputLabel>
            <Input
                id="email"
                type='text'
                value={this.state.email}
                onChange={this.handleChange}
                
            />
        </FormControl>
        <br />
        <br />
        <FormControl>    
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
            />
        </FormControl>
        <br />
        <label id="Error" style={styles.error} class="text-danger"> Wrong Email or Password</label>
        <br />
        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>
            Login
        </Button>
        {
            this.state.id? 
                <Redirect to={{pathname: "/Home"}}/>:
                (this.state.forgot? <Redirect to={{pathname: "/forgot"}}/>:
                (this.state.signUp? <Redirect to={{pathname: "/InvestorRegister"}}/>:<div/>))
        }
        <div className="dropdown-divider"></div>
            <Button variant="primary" size="large" onClick={() => {this.setState({signUp: true})}}>
                New around here? Sign up.
            </Button>
            <Button variant="primary" size="large" onClick={() => {this.setState({forgot: true})}}>
                Forgot password?
            </Button>
    </div>
    )}
}

export default ExternalLogin;
