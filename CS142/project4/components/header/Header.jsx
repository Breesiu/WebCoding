// TODO: has worning
import React from 'react';
import './Header.css';

class Header extends React.Component{
    render(){
        return (
            <div id="header-container">
                <img className='header-my-logo' src='./components/header/logo.png'/>
                <div className='header-phrase' >Welcome to Shichengxin's Website&trade;</div>
                <div className='header-rectangle'></div>
            </div>
        )
    }
}
export default Header;