import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation'

import ActivitiesList from './components/activities/ActivitiesList'
import CreateActivity from './components/activities/CreateActivity'

import TodosList from './components/todos/TodosList'
import CreateTodo from './components/todos/CreateTodo'

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
          <Route path="/" exact component={ActivitiesList} />
          <Route path="/createActivity" component={CreateActivity} />
          <Route path="/editActivity/:id" component={CreateActivity} />

          <Route path="/todos/:id" component={TodosList} />
          <Route path="/createTodo/:activity" component={CreateTodo} />
          <Route path="/editTodo/:activity/:id" component={CreateTodo} />
          
      </div>
    </Router>
  );
}

export default App;