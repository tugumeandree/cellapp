import React, {Component} from 'react';
import {
  Button,
  Icon
} from 'native-base'

var username = "Marc Marco";

export default class LikeBtn extends Component{
  constructor(props)
  {
    super(props)
  }

  render(){
    let liked = false;

    if (this.props.likedBy !== undefined){ // check if likes are not 0
      for (let i in this.props.likedBy){
        if (this.props.likedBy[i] === username){ //check if current user liked the post
          liked = true; //set to true if  user liked post
        }
      }
    }
    //return full icon if liked or outline icon if !liked
    if (liked){
      return (
        <Button transparent onPress={this.props.onPress}>
          <Icon name="ios-thumbs-up" />
        </Button>
      )
    }
    return(
      <Button transparent onPress={this.props.onPress}>
        <Icon name="ios-thumbs-up-outline" />
      </Button>
    )
  }
}
