import React from 'react';
import './App.css';
import PrivateRoute from '../Utils/PrivateRoute'
import PublicRoute from '../Utils/PublicRoute'
import Header from '../Header/Header';
import {LogoutModal} from '../Utils/Utils'
import {Switch} from 'react-router-dom';
import LandingPage from '../Routes/LandingPage/LandingPage'
import RegistrationPage from '../Routes/RegistrationPage/RegistrationPage'
import LoginPage from '../Routes/LoginPage/LoginPage'
import DemoLoginPage from '../Routes/DemoLoginPage/DemoLoginPage'
import AddMediaPage from '../Routes/AddMediaPage/AddMediaPage'
import WatchedPage from '../Routes/WatchedPage/WatchedPage'
import TokenService from '../Service/TokenService';

class App extends React.Component {
  state = {
    visible: false
  }

  openModal = () => {
    this.setState({
      visible : true
    });
}

  closeModal = () => {
    this.setState({
      visible : false
    });
  }

  handleLogout = () => {
    TokenService.clearAuthToken();
    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <LogoutModal visible={this.state.visible} closeModal={this.closeModal} handleLogout={this.handleLogout} />
        <Header openModal={this.openModal} closeModal={this.closeModal} />
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
}

export default App;