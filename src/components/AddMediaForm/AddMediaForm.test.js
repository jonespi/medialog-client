import React from 'react';
import ReactDOM from 'react-dom';
import AddShowForm from './AddShowForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddShowForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});