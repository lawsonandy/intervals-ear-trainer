import React from 'react';
import Header from './Header';
import Signin from "./Signin";
import Signup from "./Signup";
import Home from './Home';
import QuizList from './QuizList';
import FlashCards from './FlashCards';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
        <Route exact path="/quizlist" component={QuizList} />
        <Route exact path="/cards" component={FlashCards} />
      </Switch>
    </Router>
  );
}

export default App;