import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';

import DinamicSwitching from './components/dynamicSwitching/DynamicSwitching';

ReactDOM.render(
  <div>
    <Header />
    <DinamicSwitching />
  </div>,
  document.getElementById('reactapp'),
);
