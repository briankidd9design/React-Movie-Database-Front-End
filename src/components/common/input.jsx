import React from "react";

// const Input = (props) => {
//destructure the name
//this is the interface of the Input component
const Input = ({ name, type, label, value, onChange, error }) => {
  return (
    <div className="form-group">
      {/* you have to use htmlFor becuase for is a JavaScript reserved keyword */}
      {/* <label htmlFor="username">Username</label> */}
      <label htmlFor={name}>{label}</label>
      {/* you should minimize the use of refs and only use it when you know what you are doing */}
      <input
        // autoFocus
        //   value={account.username}
        value={value}
        // onChange={this.handleChange}
        onChange={onChange}
        //   ref={this.username}
        id={name}
        name={name}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
