import React from 'react';
import './App.css';
import PrivateRoute from '../Utils/PrivateRoute'
import PublicRoute from '../Utils/PublicRoute'
import Header from '../Header/Header';
import {Route, Switch} from 'react-router-dom';
import LandingPage from '../Routes/LandingPage/LandingPage'
import RegistrationPage from '../Routes/RegistrationPage/RegistrationPage'
import LoginPage from '../Routes/LoginPage/LoginPage'
import AddMoviePage from '../AddMoviePage/AddMoviePage'
import WatchedPage from '../Routes/WatchedPage/WatchedPage'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path={'/'} component={LandingPage}/>
        <PublicRoute path={'/register'} component={RegistrationPage}/>
        <PublicRoute path={'/login'} component={LoginPage}/>
        <PrivateRoute path={'/add'} component={AddMoviePage}/>
        <PrivateRoute path={'/watch_list'} component={WatchedPage} />
      </Switch>
    </div>
  );
}

export default App;