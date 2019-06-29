import React from 'react';
import ReactDOM from 'react-dom';
import TvResult from './TvResult'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TvResult />, div);
  ReactDOM.unmountComponentAtNode(div);
});