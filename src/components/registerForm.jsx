import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
// import { register } from "../services/userService";
import * as userService from "../services/userService";
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
    .required()
    .email()
    .label("Username"),
    password: Joi.string()
    .required()
    .min(5)
    .label("Password"),
    name: Joi.string()
    .required()
    .label("Name")
  };

  doSubmit = async () => {
    //Call the server
  try {
    const response = await userService.register(this.state.data);
    auth.loginWithJwt(response.headers['x-auth-token'])
    // localStorage.setItem('token', response.headers['x-auth-token']);
    // this.props.history.push('/');
    window.location = '/';
    console.log(response);
  }catch(ex) {
    if (ex.response && ex.response.status === 400){
      //pass the errors object to the state
      const errors = {...this.state.errors};
      //the response that you get from the server is ex.repsonse.data
      errors.username = ex.response.data;
      this.setState({ errors })
    }
  }
    // console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                {this.renderInput("name", "Name")}
                {this.renderButton("Register")}
            </form>
      </div>
    );
  }
}

export default RegisterForm;
