import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import UserList from "./2-table";
import ListedUsers from "./1-xhr ";
import UserChart from "./3-chart";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h2>Table</h2>
        <Link to="/list"> Userlist </Link>
        <Link to="/users"> Users </Link>
        <Link to="/chart"> Chart </Link>

        <Route path="/users" component={UserList} exact={true} />
        <Route path="/list" component={ListedUsers} />
        <Route path="/chart" component={UserChart} />
      </div>
    </BrowserRouter>
  );
}

export default App;
