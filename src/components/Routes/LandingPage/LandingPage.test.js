import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import LandingPage from './LandingPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={LandingPage} />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});