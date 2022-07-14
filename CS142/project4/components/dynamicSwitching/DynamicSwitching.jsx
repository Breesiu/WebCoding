import React from 'react';
import './DynamicSwitching.css';

import States from '../states/States';
import Example from '../example/Example';
class DynamicSwitching extends React.Component{
    constructor(props){
        super(props);
        // this.handleTurnToExampleClick = this.handleTurnToExampleClick.bind(this);
        // this.handleTurnToStatesClick = this.handleTurnToStatesClick.bind(this);
        this.state = {
            isSwitch : false,
        };
    }
    handleTurnToExampleClick(){
        this.setState({isSwitch : false});
    }
    handleTurnToStatesClick(){
        this.setState({isSwitch : true});
    }

    render(){
        var button;
        var returnPage;
        if(this.state.isSwitch){
            button = <TurnToExample onClick = {() => {this.handleTurnToExampleClick()}} />;
            returnPage = <States />;
        }else{
            button = <TurnToStates onClick = {() => {this.handleTurnToStatesClick()}} />;
            returnPage = <Example />;
        }
        return(
            <div>
                {button}
                {returnPage}
            </div>
        );
    }
}

export default DynamicSwitching;


function TurnToExample(props) {
    return(
        <button className = "dynamicButton" onClick = {props.onClick}>
        Switch to Example
        </button>  
    );
}
function TurnToStates(props) {
    return(
        <button className = "dynamicButton" onClick = {props.onClick}>
        Switch to States
        </button>  
    );
}