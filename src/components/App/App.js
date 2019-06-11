import React from 'react';
import './App.css';
import Header from '../Header/Header';
import {Route, Switch} from 'react-router-dom';
import RegistrationForm from '../RegistrationForm/RegistrationForm'
import LoginForm from '../LoginForm/LoginForm'
import AddMoviePage from '../AddMoviePage/AddMoviePage'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path={'/register'} component={RegistrationForm}/>
        <Route exact path={'/login'} component={LoginForm}/>
        <Route exact path={'/add'} component={AddMoviePage}/>
      </Switch>
    </div>
  );
}

export default App;