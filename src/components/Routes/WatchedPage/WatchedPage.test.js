import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import WatchedPage from './WatchedPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <WatchedPage />
  </BrowserRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});