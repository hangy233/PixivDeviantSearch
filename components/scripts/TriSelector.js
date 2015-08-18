import React from 'react';
import $ from 'jquery';
import 'jquery-mousewheel';

class TriSelector extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            active: 1,
            trans: 'done'
        };
    this._move = this._move.bind(this);
    this._handleScroll = this._handleScroll.bind(this);
    this._handleEvent = this._handleEvent.bind(this);
    this._moveUp = this._moveUp.bind(this);
    this._moveDown = this._moveDown.bind(this);

  }
  
  
  _handleEvent() {
    
    let id = this.props.id,
        that = this;   
        
    $("#"+id + " .clickScroll").off("click");
    $("#"+id).off("mousewheel", this._handleScroll);
  

    let after = function(){
      $("#"+id + " .clickScroll#up").on("click", that._moveUp);
      $("#"+id + " .clickScroll#down").on("click", that._moveDown);
      $("#"+id).on("mousewheel", that._handleScroll);
    };
      
    setTimeout(after,1000);
    
  }
    
    
    
  _move (dir) {
    let that = this;
    this.setState({
      trans: dir>0? 'moveUp' : 'moveDown'
    });
    
    function after() {
      if(dir!==0){
        that.setState({
          trans: 'done',
          active: dir>0? that.state.active+1 : that.state.active-1
        });
      }
    }
    
    setTimeout(after,1000);
  }
  
  _moveUp() {
  
    this._move(1);

    this._handleEvent();
  }
  
  _moveDown(){
    
    this._move(-1);

    this._handleEvent();

  }
  
  _handleScroll(e) {

    this._move(e.deltaY);

    this._handleEvent();

  }

  componentDidMount() {
    let id=this.props.id;
    
    $("#"+id).on("mousewheel", this._handleScroll);
    $("#"+id + " .clickScroll#up").on("click", this._moveUp);
    $("#"+id + " .clickScroll#down").on("click", this._moveDown);
    
  }
  
  
  render () {
    
    function loop(num, loop) {
      if(num<0){
        return 2+((num+1) % loop);
      }
      if(num>2){
        return ((num) % loop) ; 
      }
      return num;
    }
    
    let st =  this.props.status,
        active = this.state.active;
    

    
    return (
      <div className="triSelector" id={this.props.id} onScroll={this._handleScroll}>
        <div className = {this.state.trans}>
            <span>{st[ loop(active-2, 3) ]}</span>
            <span className = "clickScroll" id="down" >{st[ loop(active-1, 3) ]}</span>
            <span>{st[ loop(active, 3) ]}</span>
            <span className = "clickScroll" id="up" >{st[ loop(active+1, 3) ]}</span>
            <span>{st[ loop(active+2, 3) ]}</span>
          </div>
        <div>{this.props.tag}</div>
      </div>
    );

  }

}

export default TriSelector;
