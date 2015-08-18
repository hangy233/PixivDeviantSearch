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
    bodyMsg: 'Type in the tags you want to search'
  },
  loading: {
    headerMsg: 'Just one second',
    iconColor: 'black',
    icon: 'notched circle loading',
    bodyMsg: 'Fetching data......'
  },
  noContent: {
    headerMsg: 'No search results',
    iconColor: 'black',
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
            msgInfo: msg.start,
            query:""
        };
    }


    componentDidMount () {
        let results = [],
                that = this,
                r18='',
                animated='',
                r18Selector=$('#r18 span:nth-child(3)').text(),
                aniSelector=$('#animated span:nth-child(3)').text();
                
        function passResults(length){
                that.setState({
                    res: results,
                    msgInfo: length!==0 ? false : msg.noContent
                });
                $(window).on("scroll", function() {
                   if($(window).scrollTop() + $(window).height() == $(document).height()) {
                    emitter.emit('add', that.state);           
                       
                   }
                });
            }
            
        function getResults(res, callback){
            let max = res.artworks.length;
            for (let i = 0; i < max; i++) {
                let artwork = res.artworks[i];
                $.getJSON( "http://api.neko.maid.tw/retrieve.json?site=pixiv&artwork_id=" + artwork.id, function( picres ) {
                    if(!picres.error){
                        results.push({
                            thumb: picres.thumb,
                            bigurl: picres.photos[0].url,
                            title: picres.title,
                            url: artwork.original_url
                        });
                    }
                        
                    if(i === max-1){
                        callback();
                    }
                });
                    
            }
                
        }
        
        
      
            
            
        $(window).on("scroll", function() {
           if($(window).scrollTop() + $(window).height() == $(document).height()) {
            emitter.emit('add', that.state);           
               
           }
        });
        
        emitter.on('add', (state) => {
            $(window).off("scroll");
            
            this.setState({
                msgInfo: msg.loading
            });
        
            switch(r18Selector){
                case 'show only':
                    r18='&rating=adult';
                    break;
                case 'including':
                    r18='';
                    break;
                case 'don\'t show':
                    r18='&rating=all';
                    break;
                default:
                    r18='';
            }
            
            $.getJSON( 'http://api.neko.maid.tw/artwork.json?site=pixiv&tag=' + '*' + encodeURIComponent(state.query) + '*' +r18 +'&start='+results.length, function( res ) {
                getResults(res,function(){
                    passResults(results.length);
                });
                
            });
        });
        
        

        emitter.on('search', (state) => {
            
            
            this.setState({
                res: null,
                msgInfo: msg.loading,
                query: state.query
            });
        
            results=[];
            
            
            switch(r18Selector){
                case 'show only':
                    r18='&rating=adult';
                    break;
                case 'including':
                    r18='';
                    break;
                case 'don\'t show':
                    r18='&rating=all';
                    break;
                default:
                    r18='';
            }
            
            $.getJSON( 'http://api.neko.maid.tw/artwork.json?site=pixiv&tag=' + '*' + encodeURIComponent(state.query) + '*' +r18 , function( res ) {
                getResults(res,function(){
                    passResults(results.length);
                });
                
            });
            
            
            // $.ajax({
            //     type: "GET",
            //     url: "http://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+" + encodeURIComponent(state.query) ,
            //     dataType: "xml",
            //     success: xmlParser
            //   });
            
            
            // function xmlParser(xml) {
                
            //     $(xml).find("item").each(function () {
            //         results.push({
            //             thumb: $(this).find("media:thumbnail").eq(2).text(),
            //             bigurl: $(this).find("media:content").text(),
            //             title: $(this).find("title").text(),
            //             url: $(this).find("link").text()
            //         });
                    
            //      });
                
            //     that.setState({
            //             res: results,
            //             msgInfo: $(xml).find("item").length()!==0 ? false : msg.noContent
            //         });
            
            // }    
            
            
        });

    }
    
       
  

    componentWillUnmount () {
        emitter.removeListener('search');
        emitter.removeListener('add');

        $(window).off("scroll");

    }
    
  
    render () {

        return (
            <div id="pixsearch-container">
                <List  res={this.state.res} />
                <Message msgInfo={this.state.msgInfo} />

            </div>
        );
    }

}

export default Container;
