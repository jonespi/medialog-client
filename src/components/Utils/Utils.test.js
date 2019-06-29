import React from 'react';
import ReactDOM from 'react-dom';
import{WatchedShow, WatchedMovie} from './Utils'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WatchedShow />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WatchedMovie />, div);
  ReactDOM.unmountComponentAtNode(div);
});