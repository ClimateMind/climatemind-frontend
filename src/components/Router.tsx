import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import QuizWelcome from '../pages/QuizWelcome';
import Quiz from '../pages/Quiz';

// To Do - How do we unit test this.

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/start" render={() => <QuizWelcome />} />
        <Route path="/quiz" render={() => <Quiz />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
