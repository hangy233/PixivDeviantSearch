import React from 'react';
import $ from 'jquery';
import emitter from './emitter';
import Message from './Message';
import List from './List';

let msg = {
  start: {
    headerMsg: 'Welcome back!',
    iconColor: 'black',
    icon: 'help',
    bodyMsg: 'Please use enter to start search!'
  },
  loading: {
    headerMsg: 'Just one second',
    iconColor: 'blue',
    icon: 'notched circle loading',
    bodyMsg: 'Fetching data......'
  },
  noContent: {
    headerMsg: 'No search results',
    iconColor: 'yellow',
    icon: 'warning',
    bodyMsg: 'There is no data.'
  },
  error: {
    headerMsg: 'Error',
    iconColor: 'red',
    icon: 'warning sign',
    bodyMsg: 'We\'re sorry please try again later.'
  }
};


              

                
                
class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            res: null,
            msgInfo: msg.start
        };
    }


    componentDidMount () {
        emitter.on('search', (state) => {
            let results = [],
                that = this;
            
            this.setState({
                res: null,
                msgInfo: msg.loading
            });
        
            
            function passResults(length){
                that.setState({
                    res: results,
                    msgInfo: length!==0 ? false : msg.noContent
                });
            }
            
            function getResults(res, callback){
                let max = res.artworks.length;
                for (let i = 0; i < max; i++) {
                    let artwork = res.artworks[i];
                    $.getJSON( "http://api.neko.maid.tw/retrieve.json?site=pixiv&artwork_id=" + artwork.id, function( picres ) {
                        if(!picres.error){
                            results.push({
                                url: picres.thumb
                            });
                        }
                        
                        if(i === max-1){
                            callback();
                        }
                    });
                    


                }
                
            }
            
            $.getJSON( 'http://api.neko.maid.tw/artwork.json?site=pixiv&&tag=' + '*' + encodeURIComponent(state.query) + '*', function( res ) {
                getResults(res,function(){
                    passResults(results.length);
                });
                
         
                
            });
            
    
        //   reqwest({
        //     url: 'https://itunes.apple.com/search?media=' + getMedia(state.media || 'all') + '&term=' + state.query.split(' ').join('+'),
        //     type: 'jsonp'
        //   })
        //   .then((res) => {
        //     this.setState({
        //       res: res,
        //       msgInfo: res.resultCount ? false : msg.noContent
        //     });
        //   })
        //   .fail((err) => {
        //     this.setState({
        //       res: null,
        //       msgInfo: msg.error
        //     });
        //   })
        //   .always(() => {
        //     emitter.emit('resetLoader');
        //   });
        });

    }
    
    
    componentWillUnmount () {
        emitter.removeListener('search');
    }
    
  
    render () {

        return (
            <div className="container">
                <Message msgInfo={this.state.msgInfo} />
                <List res={this.state.res} />
            </div>
        );
    }

}

export default Container;
