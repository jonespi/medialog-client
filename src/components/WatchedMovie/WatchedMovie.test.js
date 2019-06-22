import React from 'react';
import ReactDOM from 'react-dom';
import WatchedMovie from './WatchedMovie'

it('renders without crashing', () => {
  const defaultMovie = {}

  const div = document.createElement('div');
  ReactDOM.render(<WatchedMovie movie={defaultMovie} />, div);
  ReactDOM.unmountComponentAtNode(div);
});