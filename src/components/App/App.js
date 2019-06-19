import React from 'react';
import './App.css';
import PrivateRoute from '../Utils/PrivateRoute'
import PublicRoute from '../Utils/PublicRoute'
import Header from '../Header/Header';
import {Route, Switch} from 'react-router-dom';
import LandingPage from '../Routes/LandingPage/LandingPage'
import RegistrationPage from '../Routes/RegistrationPage/RegistrationPage'
import LoginPage from '../Routes/LoginPage/LoginPage'
import AddMoviePage from '../Routes/AddMoviePage/AddMoviePage'
import AddShowPage from '../Routes/AddShowPage/AddShowPage'
import WatchedPage from '../Routes/WatchedPage/WatchedPage'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path={'/'} component={LandingPage}/>
        <PublicRoute path={'/register'} component={RegistrationPage}/>
        <PublicRoute path={'/login'} component={LoginPage}/>
        <PrivateRoute path={'/add_movie'} component={AddMoviePage}/>
        <PrivateRoute path={'/add_show'} component={AddShowPage}/>
        <PrivateRoute path={'/watch_list'} component={WatchedPage} />
      </Switch>
    </div>
  );
}

export default App;