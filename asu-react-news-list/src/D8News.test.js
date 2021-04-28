import React from 'react';
import ReactDOM from 'react-dom';
import D8News from './D8News';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<D8News />, div);
  ReactDOM.unmountComponentAtNode(div);
});
