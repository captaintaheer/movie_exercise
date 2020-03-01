import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import Home from "./Home";
import Details from "./Details";

import "normalize.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/details/:id" component={Details} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}
export default hot(App);
