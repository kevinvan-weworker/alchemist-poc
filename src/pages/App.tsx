import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Login from './login';
import './App.scss';

const App: React.FC = () => {
  return (
    <section className="app">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </Switch>
    </section>
  );
}

export default App;
