import React from 'react';
import ReactDOM from 'react-dom';
import WatchedShow from './WatchedShow'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WatchedShow show={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});