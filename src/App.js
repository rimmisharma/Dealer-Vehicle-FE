import React from 'react';
import './App.css';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DealerPage from './components/DealerPage';
import BrandModelsPage from './components/BrandModelsPage';
import ModelDetailsPage from './ModelDetailsPage';
import SigninPage from './SigninPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './components/ProfilePage.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dealer/:id" component={DealerPage} />
        <Route exact path="/vehicles/brands/models" component={BrandModelsPage} />
        <Route exact path="/modelPage" component={ModelDetailsPage} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/profile/:id" component={ProfilePage} /> 
      </Switch>
    </Router>
  );
}

export default App;
