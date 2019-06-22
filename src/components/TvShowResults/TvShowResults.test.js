import React from 'react';
import ReactDOM from 'react-dom';
import TvShowResults from './TvShowResults'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TvShowResults />, div);
  ReactDOM.unmountComponentAtNode(div);
});