import React from 'react';
import emitter from './emitter';
import TriSelector from './TriSelector'

class Header extends React.Component {
  //getInitialState in ES6
  constructor(props) {
    super(props);
    this.state = {
      r18: 'true', //show/dismiss,/only
      animated: 'true',
      query: ''
    };

    this._search = this._search.bind(this);
    this._onChange = this._onChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);

  }

  componentDidMount () {

  }

  componentWillUnmount () {
  
  }
  


  _handleKeyDown (e) {
    // only trigger search while user type enter
    e.keyCode === 13 && this._search();
  }
  
  _search () {
     emitter.emit('search', this.state);
  }

  _onChange (e) {
    // set query state
    this.setState({
      query: e.target.value
    });
  }

  render () {

    return (
      <div id='pixsearch-header'>
          <h1>Pixearch</h1>
          
          <div id='pixsearch-searcharea'>
            <input type="text" onKeyDown={this._handleKeyDown} onChange={this._onChange} placeholder="Key words..." autoFocus />
             <i onClick={this._search} className={'icon search'}></i>
            <div id='pixsearch-filter'>
              
              <TriSelector id={'r18'} tag = {'R-18'} status = {['show only','including','don\'t show']} />
              
            </div>
          </div>
      </div>
    );
  }

}

export default Header;