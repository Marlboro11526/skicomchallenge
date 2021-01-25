import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Users from "./Users/Users";
import Form from "./Users/Form";
import Thank from "./Users/Thank";

import Resorts from "./Resorts/Resorts";

import "./App.css";

export default function App() {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    let path = window.location.pathname;
    switch (path) {
      case "/":
        setCurrent("home");
        break;
      case "/users/registration":
        setCurrent("signup");
        break;
      case "/users":
        setCurrent("users");
        break;
      case "/resorts":
        setCurrent("resorts");
        break;
      default:
        break;
    }
  }, []);

  return (
    <Router>
      <div>
        <nav className="menu">
          <ul>
            <li>
              <Link
                onClick={() => setCurrent("home")}
                className={current === "home" ? "current-page" : ""}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setCurrent("signup")}
                className={current === "signup" ? "current-page" : ""}
                to="/users/registration"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setCurrent("users")}
                className={current === "users" ? "current-page" : ""}
                to="/users"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setCurrent("resorts")}
                className={current === "resorts" ? "current-page" : ""}
                to="/resorts"
              >
                Resorts
              </Link>
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
  return (
    <>
      <div className="flex-wrapper">
        <div className="description">
          <p>Welcome to SkiCom!</p>
          <p>
            This application was made with React using create-react-app, as well
            as Rust+Rocket on the back-end.
          </p>
          <p>
            Styling is a mix of vanilla CSS with a little bit of TailwindCSS
            mixed in.
          </p>
          <p>It's using a MongoDB database for persistence.</p>
        </div>
      </div>
    </>
  );
}
