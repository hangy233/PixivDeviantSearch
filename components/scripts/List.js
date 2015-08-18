import React from 'react';
import Item from './Item';

class List extends React.Component {

  render () {

    let nodes = [];
    
    if(this.props.res && this.props.res.length > 0){
      let res = this.props.res;
        
      for (let result of res) {
        nodes.push(
          <div id='pixsearch-item'>
            <img src={result.bigurl} width={200} />
            <a href={result.url}> {result.title}</a>
          </div>
          );
      }
    }
    //console.log(res);


    return (
      <div id='pixsearch-list'>
        {nodes}
      </div>
    );
  }

}

export default List;
