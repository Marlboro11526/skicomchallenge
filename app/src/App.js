import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Users from "./Users/Users";
import Form from "./Users/Form";
import Thank from "./Users/Thank";

import Resorts from "./Resorts/Resorts";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/registration">Add User</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/resorts">Resorts</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/users/registration">
            <Form />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/thankyou/">
            <Thank />
          </Route>
          <Route path="/resorts">
            <Resorts />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <></>;
}
