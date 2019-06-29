import React from 'react';
import './App.css';
import PrivateRoute from '../Utils/PrivateRoute'
import PublicRoute from '../Utils/PublicRoute'
import Header from '../Header/Header';
import {Switch} from 'react-router-dom';
import LandingPage from '../Routes/LandingPage/LandingPage'
import RegistrationPage from '../Routes/RegistrationPage/RegistrationPage'
import LoginPage from '../Routes/LoginPage/LoginPage'
import DemoLoginPage from '../DemoLoginForm/DemoLoginForm'
import AddMediaPage from '../Routes/AddMediaPage/AddMediaPage'
import WatchedPage from '../Routes/WatchedPage/WatchedPage'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <PublicRoute exact path={'/'} component={LandingPage}/>
        <PublicRoute path={'/register'} component={RegistrationPage}/>
        <PublicRoute path={'/login'} component={LoginPage}/>
        <PublicRoute path={'/demo'} component={DemoLoginPage}/>
        <PrivateRoute path={'/add_media'} component={AddMediaPage} />
        <PrivateRoute path={'/watch_list'} component={WatchedPage} />
      </Switch>
    </div>
  );
}

export default App;