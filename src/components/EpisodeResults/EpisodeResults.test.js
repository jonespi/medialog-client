import React from 'react';
import ReactDOM from 'react-dom';
import EpisodeResults from './EpisodeResults';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EpisodeResults episodes={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});