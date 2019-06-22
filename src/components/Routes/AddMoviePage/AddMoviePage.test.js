import React from 'react';
import ReactDOM from 'react-dom';
import AddMoviePage from './AddMoviePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMoviePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});