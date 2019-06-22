import React from 'react';
import ReactDOM from 'react-dom';
import AddMovieForm from './AddMovieForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddMovieForm  getDate={()=>{}} renderDateInput={()=>{}} results={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
