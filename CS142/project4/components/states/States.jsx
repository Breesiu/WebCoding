import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    console.log('window.cs142models.statesModel()', window.cs142models.statesModel());

    this.state = {
      subString : '',
    };
  }
  handleSubStringChange(event) {
    this.setState({subString: event.target.value});
  }
  filterSubString(subString){
    var matchedArray = [];
    var statesArray = window.cs142models.statesModel();
    for(let i in statesArray){
      if(statesArray[i].toLowerCase().indexOf(subString.toLowerCase()) > -1)
        matchedArray.push(<div className='String' key = {i} >{statesArray[i]}</div>);
    }
    if(matchedArray.length == 0) return "There are no String be matched!"
    return matchedArray.sort();
  }
  render() {
    return (
      <div>
          <input id="inId" type="text" value={this.state.subString} onChange={event => {this.handleSubStringChange(event)}} />
          <p> "subString" is {this.state.subString}</p>

          <div className = 'matchedStrings'>
            {this.filterSubString(this.state.subString)}
          </div>
      </div>
    );
  }
}

export default States;
