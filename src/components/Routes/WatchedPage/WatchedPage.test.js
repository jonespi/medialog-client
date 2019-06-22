import React from 'react';
import ReactDOM from 'react-dom';
import WatchedPage from './WatchedPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WatchedPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});