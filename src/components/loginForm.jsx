import React from "react";
import { Redirect } from 'react-router-dom'
// import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    // //when using forms you should initialize the properties of your state object either to an empty string or some value that you get from the server
    // account: { username: "", password: "" },
    //all instances of "account" will be replaced by "account"
    data: { username: "", password: "" },
    errors: {},
  };
  //   username = React.createRef();

  //   componentDidMount() {
  //     //this will add focus to the username field
  //     this.username.current.focus();
  //   }

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  //   validate = () => {
  //     const options =  { abortEarly: false };
  //     // const result = Joi.validate(this.state.account, this.schema, options);
  //     const { error } = Joi.validate(this.state.data, this.schema, options);
  //         // {
  //     //   abortEarly: false,
  //     // });

  //     if (!error) return null;

  //     const errors = {};
  //     //this is map an array into an object
  //     for (let item of error.details) errors[item.path[0]] = item.message;
  //     return errors;

  //     // console.log(result);

  //     // const errors = {};

  //     // const { account } = this.state;

  //     // if (account.username.trim() === "")
  //     //   errors.username = "Username is required";
  //     // if (account.password.trim() === "")
  //     //   errors.password = "Password is required";

  //     // return Object.keys(errors).length === 0 ? null : errors;
  //   };

  //   handleSubmit = (e) => {
  //     e.preventDefault();
  //     const errors = this.validate();
  //     console.log(errors);
  //     //this returns either the error object if there is an error or an empty object
  //     //the errors object should always be set to an object and never null
  //     this.setState({ errors: errors || {} });
  //     if (errors) return;
  //     this.doSubmit();
  //     //Call the server
  //     // const username = document.getElementById('username').value;
  //     //.current property returns the actual DOM element
  //     // const username = this.username.current.value;
  //   };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      // const { data: jwt } = await login(data.username, data.password);
      await login(data.username, data.password);
      // console.log(jwt);
  
    //  this.props.history.push("/");
    const { state } = this.props.location;
    window.location = state ? state.from.pathname : '/';
    // window.location = '/';
    } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = {...this.state.errors};
          errors.username = ex.response.data;
          this.setState({ errors });
        }
    }
    const { data } = this.state;
    await login(data.username, data.password);
    //Call the server
    // console.log("Submitted");
  };
  //   validateProperty = ({ name, value }) => {

  //     const obj = { [name]: value };
  //     const schema = { [name]: this.schema[name] };
  //     const {error} = Joi.validate(obj,schema);
  //     console.log({error});
  //     return error ? error.details[0].message : null;

  //     // if (error) return null;
  //     // return error.details[0].message;

  //     // if (name === "username") {
  //     //   if (value.trim() === "") return "Username is required";
  //     // }
  //     // if (name === "password") {
  //     //   if (value.trim() === "") return "Password is required";
  //     // }
  //   };
  //   handleChange = (e) => {
  //         const account = {...this.state.account};
  //         // account.username = e.currentTarget.value;
  //        account[e.currentTarget.name] = e.currentTarget.value;
  //         //set the state of the account object
  //         this.setState({ account });
  //   }

  //   handleChange = ({ currentTarget: input }) => {
  //     const errors = { ...this.state.errors };
  //     const errorMessage = this.validateProperty(input);
  //     if (errorMessage) errors[input.name] = errorMessage;
  //     else delete errors[input.name];

  //     const data = { ...this.state.data };
  //     // account.username = e.currentTarget.value;
  //     //when working with the properties of an object dynamically, instead of dot notation, use bracket notation
  //     data[input.name] = input.value;
  //     //set the state of the account object
  //     this.setState({ data, errors });
  //   };
  render() {
    if (auth.getCurrentUser() ) return <Redirect to="/" />
    //destructuring
    // const { data, errors } = this.state;
    //   const { errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {/* <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          /> */}

          {/* <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
            value={account.password} 
            onChange={this.handleChange}  
            name="password" 
            id="password" 
            type="text" 
            className="form-control" 
         
            />
          </div> */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
