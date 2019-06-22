import React from 'react';
import ReactDOM from 'react-dom';
import SelectShowForm from './SelectShowForm'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectShowForm results={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});