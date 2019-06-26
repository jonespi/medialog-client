import React from 'react';
import ReactDOM from 'react-dom';
import AddShowPage from './AddShowPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddShowPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});