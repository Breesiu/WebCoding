import { HashRouter, Route, Link } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/Header';
import Example from './components/example/Example';
import States from './components/states/States';
import './p5.css';
ReactDOM.render(
  <div>
    <Header />
    <HashRouter>
        <div id='dynamic-toolbar'>
            <Link className='view-button' to="/states">States</Link>
            <Link className='view-button' to="/example">Example</Link>
        </div>

		<Route path="/states" component={States} />
		<Route path="/example" component={Example} />		
	</HashRouter>
  </div>,
  document.getElementById('reactapp'),
);
