// import React, { Component } from "react";
import React from 'react';
//Input: liked: boolean
//Output: onClick
//Convert this to a stateless functional component
// class Like  extends Component {
//     render() {
//         let classes = "fa fa-heart";
//         if (!this.props.liked) classes += "-o";
//         return (<i
//         onClick={this.props.onClick}
//         style= {{ cursor: "pointer"}}
//         className={classes} aria-hidden="true"></i>

//         );
//     }
// }

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
