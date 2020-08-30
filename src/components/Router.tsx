import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../pages/Home';
import QuizWelcome from '../pages/QuizWelcome';
import Quiz from '../pages/Quiz';

// To Do - How do we unit test this.

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/start" render={() => <QuizWelcome />} />
      <Route path="/quiz" render={() => <Quiz />} />
    </BrowserRouter>
  );
};

export default Router;
