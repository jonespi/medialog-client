import React from 'react';
import ReactDOM from 'react-dom';
import AddMediaForm from './AddMediaForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMediaForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});