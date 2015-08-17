import React from 'react';
import emitter from './emitter';

class Header extends React.Component {
  //getInitialState in ES6
  constructor(props) {
    super(props);
    this.state = {
      author: 'true',
      tag: 'true',
      title: 'true',
      r18: 'true',
      animated: 'true',
      quary: ''
    };

    this._search = this._search.bind(this);
    this._onChange = this._onChange.bind(this);
    this._toggleCondition = this._toggleCondition.bind(this);

  }

  componentDidMount () {

  }

  componentWillUnmount () {
  
  }
  
  _toggleCondition (condition) {
    switch (condition){
      case "tag" :
        this.setState({
          tag: !this.state.tag
        });
        break;
      case "author" :
        this.setState({
          tag: !this.state.author
        });
        break;
      case "title" :
        this.setState({
          tag: !this.state.title
        });
        break;
      case "r18" :
        this.setState({
          tag: !this.state.r18
        });
        break;
      case "animated" :
        this.setState({
          tag: !this.state.animated
        });
        break;
      default:
        
    }
    
  }

  _search (e) {
    // only trigger search while user type enter
    e.keyCode === 13 && emitter.emit('search', this.state);
  }

  _onChange (e) {
    // set query state
    this.setState({
      query: e.target.value
    });
  }

  render () {

    return (
      <div className="ui inverted vertical segment center aligned">
          <h1>Pixearch</h1>
          <input type="text" onKeyDown={this._search} onChange={this._onChange} placeholder="Key words..." autoFocus />
          
          <div>
            <p>search by: </p>
            <div className="">
              <input type="checkbox" id='tag' checked={this.state.tag} />
              <label htmlFor='tag'  onClick={this._toggleCondition.bind(this,"tag",false)}  > tag </label>
              <input type="checkbox" id='author'  checked={this.state.author}/>
              <label htmlFor='author'  onClick={this._toggleCondition.bind(this,"author",false)}  > author </label>
              <input type="checkbox" id='title'  checked={this.state.title} />
              <label htmlFor='title'   onClick={this._toggleCondition.bind(this,"title",false)}  > title </label>
            </div>
          </div>
          
          <div>
            <p>filter: </p>
            <div className="">
              <input type="checkbox" id='r18' checked={this.state.r18} />
              <label htmlFor='r18'  onClick={this._toggleCondition.bind(this,"r18",false)}  >show r18 </label>
              <input type="checkbox" id='animated'  checked={this.state.animated}/>
              <label htmlFor='animated'   onClick={this._toggleCondition.bind(this,"animated",false)}   >show animated artworks</label>
            </div>
          </div>
          
      </div>
    );
  }

}

export default Header;