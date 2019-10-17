import React from "react";
import { Link } from "react-router-dom";

export default class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://totalcloud-static.s3.amazonaws.com/intern.json"
    );

    xhr.onload = function() {
      const users = JSON.parse(xhr.responseText);
      this.setState({ users: users });
      console.log(users);
    }.bind(this);

    xhr.send();
  }

  render() {
    console.log("render");
    return (
      <div class="container">
        <h2>Listed Users - {this.state.users.length} </h2>

        <table className="table table-striped">
          <tr>
            <th>intern - assignment</th>
            <th></th>
            <th></th>
            <th>Start Date</th>
            <th>Due Date</th>
          </tr>

          {this.state.users.map(user => {
            return (
              <tr key={user.id}>
                <td>{this.state.users.indexOf(user)}</td>

                <td width="4%">
                  <input type="checkbox" name="name" />
                </td>
                <td width="66%">{user.name}</td>
                <td>
                  {`${user.start.split("/")[0]}/${
                    this.state.months[Number(user.start.split("/")[1]) - 1]
                  }`}
                </td>
                <td>{`${user.end.split("/")[0]}/ ${
                  this.state.months[Number(user.end.split("/")[1]) - 1]
                }`}</td>
              </tr>
            );
          })}
        </table>
        <Link to="/users"></Link>
      </div>
    );
  }
}
