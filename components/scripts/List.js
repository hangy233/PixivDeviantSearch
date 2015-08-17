import React from 'react';
import Item from './Item';

class List extends React.Component {

  render () {

    let nodes = [];
    
    if(this.props.res && this.props.res.length > 0){
      let res = this.props.res;
        
      for (let result of res) {
        nodes.push(<img src={result.url}  />);
      }
    }
    //console.log(res);


    return (
      <div className="ui link cards">
        {nodes}
      </div>
    );
  }

}

export default List;
