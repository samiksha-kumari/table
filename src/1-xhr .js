import React from "react";
import { Link } from "react-router-dom";

export default class ListedUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      //set initial state value
      users: []
    };
  }

  componentDidMount() {
    //lifecycle method
    const xhr = new XMLHttpRequest();
    xhr.open(
      //get url
      "GET",
      "https://cors-anywhere.herokuapp.com/https://totalcloud-static.s3.amazonaws.com/intern.json"
    );

    xhr.onload = function() {
      const users = JSON.parse(xhr.responseText);
      this.setState({ users: users });
      console.log(users);
    }.bind(this);

    xhr.send(); //send to server
  }

  render() {
    console.log("render");
    return (
      <div>
        <h2>Listed Users- {this.state.users.length}</h2>

        <ol>
          {this.state.users.map(user => {
            return (
              <li key={user.id}>
                {user.name} --
                {user.start} --
                {user.end}
              </li>
            );
          })}
        </ol>
        <Link to="/list"></Link>
      </div>
    );
  }
}
